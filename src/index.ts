import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import xhr from './xhr'
import { buildUrl } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 处理请求config参数
function processConfig(config: AxiosRequestConfig): void {
  config.headers = transformHeaders(config)
  config.url = transformURL(config)
  config.data = transformRequestData(config)
}

// 处理请求url参数
function transformURL(config: AxiosRequestConfig): string {
  let { url, params } = config
  return buildUrl(url, params)
}

// 处理请求body数据
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

// 处理请求header数据
function transformHeaders(config: AxiosRequestConfig): any {
  let { headers = {}, data } = config
  return processHeaders(headers, data)
}

// 处理相应数据
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

export default axios
