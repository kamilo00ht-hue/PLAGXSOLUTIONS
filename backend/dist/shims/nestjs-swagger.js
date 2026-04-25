"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerModule = exports.DocumentBuilder = void 0;
exports.ApiTags = ApiTags;
exports.ApiOperation = ApiOperation;
exports.ApiProperty = ApiProperty;
exports.ApiBearerAuth = ApiBearerAuth;
function ApiTags(..._tags) {
    return (_target) => undefined;
}
function ApiOperation(_options) {
    return (_target, _propertyKey, _descriptor) => undefined;
}
function ApiProperty(_options = {}) {
    return (_target, _propertyKey) => undefined;
}
function ApiBearerAuth() {
    return (..._args) => undefined;
}
class BuiltSwaggerConfig {
}
class DocumentBuilder {
    setTitle(_title) {
        return this;
    }
    setDescription(_description) {
        return this;
    }
    setVersion(_version) {
        return this;
    }
    addBearerAuth() {
        return this;
    }
    build() {
        return new BuiltSwaggerConfig();
    }
}
exports.DocumentBuilder = DocumentBuilder;
class SwaggerModule {
    static createDocument(_app, _config) {
        return {};
    }
    static setup(_path, _app, _document) {
        return;
    }
}
exports.SwaggerModule = SwaggerModule;
//# sourceMappingURL=nestjs-swagger.js.map