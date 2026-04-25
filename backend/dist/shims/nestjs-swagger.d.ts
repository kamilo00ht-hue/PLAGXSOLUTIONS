import { Type } from '@nestjs/common';
interface ApiPropertyOptions {
    example?: unknown;
    enum?: object;
    required?: boolean;
}
interface ApiOperationOptions {
    summary: string;
}
export declare function ApiTags(..._tags: string[]): ClassDecorator;
export declare function ApiOperation(_options: ApiOperationOptions): MethodDecorator;
export declare function ApiProperty(_options?: ApiPropertyOptions): PropertyDecorator;
export declare function ApiBearerAuth(): ClassDecorator & MethodDecorator;
declare class BuiltSwaggerConfig {
}
export declare class DocumentBuilder {
    setTitle(_title: string): this;
    setDescription(_description: string): this;
    setVersion(_version: string): this;
    addBearerAuth(): this;
    build(): BuiltSwaggerConfig;
}
export declare class SwaggerModule {
    static createDocument(_app: unknown, _config: BuiltSwaggerConfig): Record<string, unknown>;
    static setup(_path: string, _app: unknown, _document: Record<string, unknown>): void;
}
export type ApiExtraModelsType = Type<unknown>;
export {};
