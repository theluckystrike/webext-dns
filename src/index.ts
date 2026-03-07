export interface ResolveResult {
  resultCode: number;
  address?: string;
}

/**
 * A wrapper for the Chrome DNS API.
 */
export class DNS {
  private static get api(): any {
    if (typeof chrome === 'undefined' || !(chrome as any).dns) {
      throw new Error('Chrome DNS API is not available. It might be limited to certain platforms or require the "dns" permission.');
    }
    return (chrome as any).dns;
  }

  /**
   * Resolves a hostname into an IP address.
   */
  static async resolve(hostname: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.api.resolve(hostname, (result: ResolveResult) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }
        if (result.resultCode === 0 && result.address) {
          resolve(result.address);
        } else {
          reject(new Error(`Failed to resolve hostname: ${hostname} (Result code: ${result.resultCode})`));
        }
      });
    });
  }

  /**
   * Checks if a hostname can be resolved.
   */
  static async canResolve(hostname: string): Promise<boolean> {
    try {
      await this.resolve(hostname);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Resolves multiple hostnames in parallel.
   */
  static async resolveMany(hostnames: string[]): Promise<Record<string, string | null>> {
    const results: Record<string, string | null> = {};
    await Promise.all(
      hostnames.map(async (hostname) => {
        try {
          results[hostname] = await this.resolve(hostname);
        } catch {
          results[hostname] = null;
        }
      })
    );
    return results;
  }
}
