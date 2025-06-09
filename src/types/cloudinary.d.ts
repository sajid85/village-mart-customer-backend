declare module 'cloudinary' {
  export const v2: {
    config(config: {
      cloud_name: string;
      api_key: string;
      api_secret: string;
    }): void;
    uploader: {
      upload(
        path: string,
        options?: {
          folder?: string;
          use_filename?: boolean;
          unique_filename?: boolean;
        },
      ): Promise<{
        secure_url: string;
        public_id: string;
      }>;
    };
  };
}

declare module '@cloudinary/url-gen' {
  export class Cloudinary {
    constructor(config: {
      cloud: {
        cloudName: string;
        apiKey: string;
        apiSecret: string;
      };
    });

    image(publicId: string): {
      resize(options: { width: number; height: number; type: string }): {
        quality(value: string): {
          format(value: string): {
            toURL(): string;
          };
        };
      };
    };
  }
}
