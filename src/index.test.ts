import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DNS } from './index';

describe('DNS', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    DNS.clearCache();
    // @ts-ignore
    global.chrome = {
      dns: {
        resolve: vi.fn(),
      },
      runtime: {
        lastError: null,
      },
    };
  });

  it('should resolve a hostname', async () => {
    vi.mocked((chrome as any).dns.resolve).mockImplementation((hostname, callback) => {
      callback({ resultCode: 0, address: '1.2.3.4' });
    });

    const address = await DNS.resolve('test.com');
    expect(address).toBe('1.2.3.4');
    expect((chrome as any).dns.resolve).toHaveBeenCalledWith('test.com', expect.any(Function));
  });

  it('should reject on error result code', async () => {
    vi.mocked((chrome as any).dns.resolve).mockImplementation((hostname, callback) => {
      callback({ resultCode: 1 });
    });

    await expect(DNS.resolve('test.com')).rejects.toThrow('Failed to resolve hostname: test.com (Result code: 1)');
  });

  it('should reject on chrome.runtime.lastError', async () => {
    vi.mocked((chrome as any).dns.resolve).mockImplementation((hostname, callback) => {
      // @ts-ignore
      chrome.runtime.lastError = { message: 'DNS error' };
      callback({ resultCode: 1 });
    });

    await expect(DNS.resolve('test.com')).rejects.toThrow('DNS error');
  });

  it('should check if it can resolve', async () => {
    vi.mocked((chrome as any).dns.resolve).mockImplementation((hostname, callback) => {
      callback({ resultCode: 0, address: '1.2.3.4' });
    });
    expect(await DNS.canResolve('test.com')).toBe(true);

    vi.mocked((chrome as any).dns.resolve).mockImplementation((hostname, callback) => {
      callback({ resultCode: 1 });
    });
    expect(await DNS.canResolve('other.com')).toBe(false);
  });

  it('should resolve many hostnames', async () => {
    vi.mocked((chrome as any).dns.resolve).mockImplementation((hostname, callback) => {
      if (hostname === 'h1.com') callback({ resultCode: 0, address: '1.1.1.1' });
      else callback({ resultCode: 1 });
    });

    const results = await DNS.resolveMany(['h1.com', 'h2.com']);
    expect(results).toEqual({
      'h1.com': '1.1.1.1',
      'h2.com': null,
    });
  });

  it('should throw error if API is not available', async () => {
    // @ts-ignore
    delete global.chrome.dns;
    await expect(DNS.resolve('t.com')).rejects.toThrow('Chrome DNS API is not available.');
  });

  it('should cache resolved hostnames', async () => {
    vi.mocked((chrome as any).dns.resolve).mockImplementation((hostname, callback) => {
      callback({ resultCode: 0, address: '1.2.3.4' });
    });

    // First resolution - should call the API
    const address1 = await DNS.resolve('test.com');
    expect(address1).toBe('1.2.3.4');
    expect((chrome as any).dns.resolve).toHaveBeenCalledTimes(1);

    // Second resolution - should use cache, no API call
    const address2 = await DNS.resolve('test.com');
    expect(address2).toBe('1.2.3.4');
    expect((chrome as any).dns.resolve).toHaveBeenCalledTimes(1);
  });

  it('should clear cache', async () => {
    vi.mocked((chrome as any).dns.resolve).mockImplementation((hostname, callback) => {
      callback({ resultCode: 0, address: '1.2.3.4' });
    });

    // First resolution
    await DNS.resolve('test.com');
    expect((chrome as any).dns.resolve).toHaveBeenCalledTimes(1);

    // Clear cache
    DNS.clearCache();

    // Another resolution - should call API again
    await DNS.resolve('test.com');
    expect((chrome as any).dns.resolve).toHaveBeenCalledTimes(2);
  });
});
