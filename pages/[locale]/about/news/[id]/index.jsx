import { useTranslation } from 'next-i18next'
import { AboutLayout } from '@/components/layout/index'
import { useMemo } from 'react';
import { useRouter } from 'next/router'
import { useMedia } from '@/utils/hooks'
import { NEWS_LIST } from '@/utils/const'
import { makeStaticPaths, makeStaticProps, createParams } from '@/utils/getStatic'

const params = {
  id: NEWS_LIST.map(item=>item.id)
}
const getStaticPaths = makeStaticPaths(createParams(params))
const getStaticProps = makeStaticProps(['common'], async (ctx) =>{
  const id = ctx?.params?.id
  if(id===undefined) return {}
  let news = await import(`@/utils/json/news/article/${id}.json`)
        .then(module => module.default)
  return {
    news,
    detailMenu: NEWS_LIST.find(item=>item.id==id)?.title??''
  }
})

export { getStaticPaths, getStaticProps }


export default function NewsDetailPage({detailMenu, news}) {
  // const { t } = useTranslation('common')
  const router = useRouter()
  const id = router.query.id

  const renderTitle = (title) => (
    <p className='text-black/90 text-lg/[28px] font-medium mb-4 sm:text-base'>{title}</p>
  )

  const renderHeader = ( header ) => (
    <p className='text-black/90 text-[22px]/[36px] mb-4 sm:font-medium'>{header}</p>
  )

  const renderContent = ( content ) => (
    <p className='text-black/70 mb-6 text-[16px]/[28px] sm:text-xs/[20px]'>{content}</p>
  )

  const renderImg = ( img, desc ) => (
    <div className='mb-6'>
      <img className='w-full' src={img}/>
      <p className='mt-4 text-black/[.55] text-xs text-center'>{desc}</p>
    </div>
  )




  return (
    <div className='px-4 pb-10 sm:pl-6  sm:pb-14 sm:pr-0'>
      {renderHeader(detailMenu)}
       <div dangerouslySetInnerHTML={{__html:news}}></div>
      {/* <div>
        {renderContent('高标准严要求，打造优秀售后服务平台，实现售后服务的全覆盖，为消费者带来便捷、高效、专业的售后服务体验。公司售后服务中心自成立以来，经过五年的持续发展，现售后团队拥有：400呼叫中心、配件发放中心、结算中心、技术支持中心、驻外售后服务经理团队等，总规模达30人。遍及全国700个自建网点，同时引进了安时达，蓝领到家等优质的第三方服务平台，为公司的售后服务添砖加瓦，确保了公司售后服务的及时快速，提升了客户满意度')}
        {renderImg('/images/news/0/image-1.png')}
        {renderTitle('月兔空调“聚力革新 持续增长”')}
        {renderContent('“聚力革新，持续增长”，聚：聚大势，聚大家，聚能量，新冷年月兔空调大势所向；力：品牌影响力，市场推动力，产品创新力；革新：全面贯彻落实新冷年集团持续增长战略，全变频战略；重渠道，抢市场，助力客户持续增长。2023新冷年，月兔空调将进入高速度发展的新赛道。月兔空调的新蓝海战略是什么？')}
        {renderContent('据月兔科技董事长王强的介绍：一是“守”——坚守增长型策略，二是“破”——破局品类新赛道，三是“离”——离开同质化红海。')}
        {renderImg('/images/news/0/image-2.png')}
        {renderTitle('守：守住品质，守住基本盘')}
        {renderContent('品质是价值与尊严的起点。品质管理犹如健康管理，品质是“1”，没有良品质，其他都是“0”，近年来，月兔全面导入航天品控管理。目前，月兔拥有多套3P-5P焓差实验室、热平衡实验室、变频控制实验室，噪声测试实验室，各类全新的智能化检测系统，装备优良，能够精准实现空调配件与整机的安全与性能检测。')}
        {renderContent('从产品开发和质量控制的角度对年度新品进行系统的规划，持续加大研发投入，拓宽产品线，通过加强研发与质量团队建设，持续不断的提供技术先进、质量可靠、成本领先的变频产品，变频高配置，产品全，为月兔的持续、快速发展提供坚实的产品保障。通过标准化，制度化，规范化精细的研发流程检测项目，极限实验，过程控制，出厂检验项目，确保产品质量。2023年目标将市场维修率达到行业领先水平。')}
        {renderImg('/images/news/0/image-3.png')}
        {renderTitle('破：突破传统，创造新品类')}
        {renderContent('空调行业经过多轮洗牌，技术升迁迭代，已从定频空调——解决制冷制热需求进入变频时代——解决节能舒适的需求，向第三代新风空调——解决消费者的智慧健康需求跃迁。')}
        {renderContent('为了适应空调行业全面升级换代时代趋势，抓住产业互联网的的智造机遇，月兔科技重点研发“节能、静音、智能、健康、新风”新品类空调，打开新赛道，全线产品均采用名牌压缩机，自主研发的全直流变频空调，外观时尚，技术领先，省电30%以上的变频机在高温天气下优势凸显，为用户省电省钱，赢得广大客户一致好评。月兔紧紧把握智能化时代脉搏，智能语音控制已覆盖全产品。月兔倡导售后服务社会化与自建网络一体化稳步推进，实现市场的全域无缝覆盖，为消费者提供全渠道消费服务。新冷年月兔将不断提升企业的核心竞争力，聚焦全屋智能，打造“舒适居家系统”为用户提供一流极致体验的高能效产品。')}
        {renderImg('/images/news/0/image-4.png', '宁化月兔科技有限公司国内营销中心总经理 李治国')}
        {renderTitle('离： 利他升位，成就客户群')}
        {renderContent('空调行业“价格战”，让企业深受其害，企业无利润，研发无投入；商家无利润，无法深耕细作做服务。近年来，月兔空调坚守积极进攻的市场态度，坚守渠道代理制、确保代理商的战略地位、保护渠道，保护商家，实施稳健且具连续性的价格政策，聚焦爆款策略，主推利润机型，稳健操作，让客户赚到钱，让用户省了钱。')}
        {renderContent('2023新冷年，月兔空调将继续坚持利他政策，深耕区域市场，与代理商拧成一股绳，合成一条心，共谋发展。对内“不卷”，资源统筹，组织平台化，通过政策支持增加渠道终端投入，打造标杆形象店，优化产品结构，保持市场竞争力；对外“不圈”，重点扶持代理商做大做强，通过品牌、营销、团队的市场策略提升品牌识别度，构建有竞争力的产品体系，推出爆款、高端、畅销等增长型变频产品抢占市场份额。')}
        {renderContent('“守破离”，源于禅学，兴于剑道。新冷年月兔蓝海战略就是通过“守破离”，坚守初心，脱离不必要的执念；通过“守破离”，重构专注力，养成竞争力；通过“守破离”，离开“价格战”红海，挺进持续增长的“新蓝海”！')}
      </div> */}
    </div>
  )
}

NewsDetailPage.getLayout = (page, { detailMenu }) => (
  <AboutLayout detailMenu={detailMenu}>
    {page}
  </AboutLayout>
)