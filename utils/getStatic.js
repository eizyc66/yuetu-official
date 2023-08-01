import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nextConfig from '../next-i18next.config'

export const getI18nPaths = () =>
  i18nextConfig.i18n.locales.map((lng) => ({
    params: {
      locale: lng
    }
  }))

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths()
})

export async function getI18nProps(ctx, ns = [], fun) {
  const locale = ctx?.params?.locale
  ns = [...ns, 'common']
  let props = {
    ...(await serverSideTranslations(locale, ns)),
    ...(await fun(ctx))
  }

  return props
}

export function makeStaticProps(ns = {} , fun = async()=> ({})) {
  return async function getStaticProps(ctx) {
    return {
      props: await getI18nProps(ctx, ns, fun)
    }
  }
}

export const makeStaticPaths = (array) => {
  let paths = []
  if(array?.[0]?.locale) {
    paths = array.map(item=>({
      params: item
    }))
  } else {
    paths = getI18nPaths()
    paths = array.reduce((res, ele)=>{
      const arr = paths.map(item=>({
        params: {
          ...item.params,
          ...ele
        }
      }))
      res.push(...arr)
      return res
    },[])
  }
  return () => ({
    fallback: false,
    paths
  })
}



export const createParams = (data) => {
  let result = []
  let keys = Object.keys(data)
  keys.forEach((key, idx)=>{
    const valueArr = data[key]
    const arr = valueArr.reduce((res, val)=>{
      if(idx==0) {
        res.push({[key]: val})
      }
      else {
        res.push(...result.map(item=>({...item, [key]: val})))
      }  
      return res
    },[])
    result = arr
  })
  return result
}