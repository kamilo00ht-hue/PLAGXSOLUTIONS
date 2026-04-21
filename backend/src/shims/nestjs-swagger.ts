import { Type } from '@nestjs/common';

interface ApiPropertyOptions {
  example?: unknown;
  enum?: object;
  required?: boolean;
}

interface ApiOperationOptions {
  summary: string;
}

export function ApiTags(..._tags: string[]): ClassDecorator {
  return (_target) => undefined;
}

export function ApiOperation(_options: ApiOperationOptions): MethodDecorator {
  return (_target, _propertyKey, _descriptor) => undefined;
}

export function ApiProperty(_options: ApiPropertyOptions = {}): PropertyDecorator {
  return (_target, _propertyKey) => undefined;
}

export function ApiBearerAuth(): ClassDecorator & MethodDecorator {
  return (..._args: unknown[]) => undefined;
}

class BuiltSwaggerConfig {}

export class DocumentBuilder {
  setTitle(_title: string): this {
    return this;
  }

  setDescription(_description: string): this {
    return this;
  }

  setVersion(_version: string): this {
    return this;
  }

  addBearerAuth(): this {
    return this;
  }

  build(): BuiltSwaggerConfig {
    return new BuiltSwaggerConfig();
  }
}

export class SwaggerModule {
  static createDocument(_app: unknown, _config: BuiltSwaggerConfig): Record<string, unknown> {
    return {};
  }

  static setup(_path: string, _app: unknown, _document: Record<string, unknown>): void {
    return;
  }
}

export type ApiExtraModelsType = Type<unknown>;
