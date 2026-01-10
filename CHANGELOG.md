# Changelog

All notable changes to this project will be documented in this file.

## [1.6.10] - 2026-01-10

### ⚙️ Miscellaneous Tasks

- *(Dockerfile)* Remove husky install command from package.json

## [1.6.9] - 2026-01-10

## [1.6.8] - 2026-01-10

## [1.6.7] - 2026-01-10

## [1.6.6] - 2026-01-10

## [1.6.5] - 2026-01-01

# Changelog

All notable changes to this project will be documented in this file.

## [1.6.4] - 2025-11-21

### ⚙️ Miscellaneous Tasks

- Update dependencies and devDependencies to latest versions

# Changelog

All notable changes to this project will be documented in this file.

## [1.6.3] - 2025-07-20

### ⚙️ Miscellaneous Tasks

- Update Docker image tags to use dynamic versioning from package.json

## [1.6.2] - 2025-07-20

### ⚙️ Miscellaneous Tasks

- Update Docker image tags to version 1.6.1

## [1.6.1] - 2025-07-19

### ⚙️ Miscellaneous Tasks

- Update release script name to 'image-optimize' in package.json

## [1.6.0] - 2025-07-19

### 🚀 Features

- Throw error 400 on image download error
- Update packages versions
- Update sharp library version
- Willsoto/nestjs-prometheus by prom-client, use originalUrl for logs
- Update dependencies versions
- Update dependecies version
- Add Fastify server for testing image optimization

### 🐛 Bug Fixes

- Throw error 404 if image src return 404
- Update ESLint configuration file name in Dockerfile and README example URL
- Correct typos and improve clarity in README.md

### 🧪 Testing

- Fix metrics test
- Update e2e controll summ
- Enhance OptimizeController tests with comprehensive validation scenarios

### ⚙️ Miscellaneous Tasks

- Update github action versions
- Add husky, minor code style fixes
- *(release)* 1.4.0
- Update docker image version
- Remove husky from production container
- Add badges to readme
- Update code style for md files
- Make correct license
- Update markdown styles
- Fix badges reositories
- Add markdown lint
- Add badge for sharp js library
- Update code style for readme
- Clean package-lock
- Update npm link url
- Remove npm badge
- Code style for code of conduct
- *(release)* 1.5.0
- Update dependencies and devDependencies to latest versions
- Remove pull request trigger from Docker publish workflow
- Update Docker workflow and add git-cliff configuration for changelog management
- Update package-lock.json
- Add permissions section for contents write access in Docker workflow
- Update permissions in Docker workflow to allow write access for contents

## [1.5.0](https://github.com/MobileTeleSystems/image-optimize/compare/v1.4.0...v1.5.0) (2023-10-02)


### Features

* update dependencies versions ([aee780c](https://github.com/MobileTeleSystems/image-optimize/commit/aee780c48a203ebba767bb33ed78aa0e63516199))
* update sharp library version ([2ff333d](https://github.com/MobileTeleSystems/image-optimize/commit/2ff333d2b54bbe2c0366a5d9569c4cd4e0044a57))
* willsoto/nestjs-prometheus by prom-client, use originalUrl for logs ([f4aca04](https://github.com/MobileTeleSystems/image-optimize/commit/f4aca0411b92bbb7df01d07cdc858ed0e422ffb8))

## 1.4.0 (2022-12-30)

### Features

    * throw error 400 on image download error ([f9af9c0](https://github.com/MobileTeleSystems/image-optimize/commit/f9af9c04879573dbbf1301e1323ddc7d2059ddd8))
    * update packages versions ([11e314e](https://github.com/MobileTeleSystems/image-optimize/commit/11e314ec7a68b3981a37399b621cabac26333a90))

### Bug Fixes

* throw error 404 if image src return 404 ([dc4bf2a](https://github.com/MobileTeleSystems/image-optimize/commit/dc4bf2aea308f88a18b8427004ff0281e55ce0c5))
