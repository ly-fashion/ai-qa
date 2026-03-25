import { ApiProperty } from '@nestjs/swagger';

export const SUCCESS_CODE = 200;
export const FAIL_CODE = 500;

/**
 * ResultData是一个用来构建统一的响应格式的类。它包含了一个code，一个msg，以及一个data。
 * code是一个响应码，用来表示请求是否成功；
 * msg是一个用来描述响应状态的信息；
 * data是一个用来传递响应数据的字段。
 *
 * 它提供了两个静态方法ok和fail，用来构建响应。
 * ok方法用来构建成功响应，默认code为SUCCESS_CODE（200），msg为'操作成功'，data为传入的数据。
 * fail方法用来构建失败响应，可以传入自定义的code，msg和data，如果没有传入，则使用默认值。
 *
 * 它使用了@nestjs/swagger的@ApiProperty装饰器来描述响应格式，以便在Swagger中展示。
 *
 */
export class ResultData<T = any> {
  constructor(code = SUCCESS_CODE, msg?: string, data?: T) {
    this.code = code;
    this.msg = msg || '操作成功';
    this.data = data || null;
  }

  @ApiProperty({ type: 'number', default: SUCCESS_CODE })
  code: number;

  @ApiProperty({ type: 'string', default: '操作成功' })
  msg?: string;

  data?: any;

  static ok(data?: any, msg?: string): ResultData {
    return new ResultData(SUCCESS_CODE, msg, data);
  }

  static fail(code: number, data?: any, msg?: string): ResultData {
    return new ResultData(code || FAIL_CODE, msg || '操作失败', data);
  }
}
