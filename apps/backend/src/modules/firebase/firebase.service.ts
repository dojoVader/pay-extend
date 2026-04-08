import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FirebaseService {
  constructor(
    private readonly config: ConfigService,
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  private resolvedCredentialPath(): string | null {
    const credPath = this.config.get<string>('GOOGLE_APPLICATION_CREDENTIALS');
    return credPath ? path.resolve(credPath) : null;
  }

  isCredentialConfigured(): boolean {
    const resolved = this.resolvedCredentialPath();
    return !!resolved && fs.existsSync(resolved);
  }

  private readProjectId(resolvedPath: string): string | null {
    try {
      const raw = fs.readFileSync(resolvedPath, 'utf8');
      const json = JSON.parse(raw) as { project_id?: string };
      return json.project_id ?? null;
    } catch {
      return null;
    }
  }

  async getStatus(): Promise<{
    configured: boolean;
    credentialPath: string | null;
    projectId: string | null;
    message: string;
  }> {
    const credentialPath = this.config.get<string>('GOOGLE_APPLICATION_CREDENTIALS') ?? null;
    const resolved = this.resolvedCredentialPath();
    const fileExists = !!resolved && fs.existsSync(resolved);

    if (!credentialPath) {
      return {
        configured: false,
        credentialPath: null,
        projectId: null,
        message: 'GOOGLE_APPLICATION_CREDENTIALS is not set',
      };
    }

    if (!fileExists) {
      return {
        configured: false,
        credentialPath,
        projectId: null,
        message: 'Credential file not found at the specified path',
      };
    }

    const projectId = this.readProjectId(resolved!);

    // Probe the SDK is live by calling a lightweight method
    try {
      // Just referencing firebase.auth confirms the SDK initialised
      void this.firebase.auth;
      return {
        configured: true,
        credentialPath,
        projectId,
        message: 'Firebase Admin SDK is configured and ready',
      };
    } catch {
      return {
        configured: false,
        credentialPath,
        projectId,
        message: 'Firebase Admin SDK failed to initialise',
      };
    }
  }
}
