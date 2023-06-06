import { useMediaQuery } from 'react-responsive'
import { useState, useEffect } from 'react';
import { useRouter as useRouterNext } from 'next/router';

export const useMedia = (isPC = null)  => {
  const config = {minWidth: 640}
  const [state, setState] = useState(isPC);
  const clientState = useMediaQuery(config)

  useEffect(() => {
    setState(clientState)
  }, [clientState]);

  return state;
}

export const useRouter = () => {
  const router = useRouterNext()
  const locale = router.query.locale || ''
  const replacePath = (path) =>  path? `/${locale}${path}` : router.pathname.replace('[locale]', locale)
  return {
    push: (path)=>{
      if(!locale) return
      path = path || router.asPath
      path = replacePath(path)
      router.push(path)
    },
    replace: (path)=>{
      if(!locale) return
      path = path || router.asPath
      path = replacePath(path)
      router.replace(path)
    }
  }
}


