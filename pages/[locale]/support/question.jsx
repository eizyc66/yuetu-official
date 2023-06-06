import { useTranslation } from 'next-i18next'
import { SupportLayout } from '@/components/layout/index'
import { useMemo } from 'react';
import { useMedia } from '@/utils/hooks'
import NoSSR from 'react-no-ssr';
import { getStaticPaths, makeStaticProps } from '@/utils/getStatic'

const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }

export default function QueationPage({common}) {
  const { t } = useTranslation('common')
  const isPC = useMedia()

  const renderQuestion = (title) => (
    <div className='pb-4 text-black/90 text-lg/[28px] border-b border-black/[.07] flex flex-row items-start font-medium mb-6 sm:text-base sm:mb-4'>
       <span className='mr-2 text-black/[.35]'>Q</span><span className='flex flex-1'>{title}</span>
    </div>
  )

  const renderAnswer = (title, content) => {
    const renderList = (list)=> (
      <ul className='list-disc pl-5'>
        {list.map(item=>(
          <li className='mt-2' key={item}>{item}</li>
        ))}
      </ul>
    )
    return <>
    <p className='text-black/90 text-lg/[28px] font-medium mb-3 flex flex-row items-start sm:text-base'>
       <span className='mr-2 text-primary'>A</span><span className='flex flex-1'>{title}</span>
    </p>
    <div className='mb-7 text-base/[28px] text-black/70 sm:text-xs/[20px] sm:mb-8'>
      {Array.isArray(content)?renderList(content):
      <div className='pr-4' dangerouslySetInnerHTML={{__html:content}}></div>}
    </div>
    </>
  }
   

  const renderImg = (path, name) => (
    <>
      <img className='w-full' src={path}/>
      <p className='mt-2 mb-8 text-black/[.55] text-center sm:mt-4 sm:mb-10 sm:text-xs'>{name}</p>
    </>
  )

  return (
    <>
      <div className='px-4 pb-10 sm:pl-6 sm:pb-14'>
        {renderQuestion('变频空调是如何工作的？')}
        {renderAnswer(
          '我们先来了解一下变频空调是如何工作的？',
          [
            '变频空调选用了变频专用压缩机，增加了变频控制系统。变频空调的主机可以自动进行无级变速，可以根据房间情况自动提供所需的冷（热）量；',
            '当室内温度达到期望值后，空调主机则以能够准确保持这一温度的速度运转，实现“不停机运转”，从而保证房间温度的稳定。'
          ]
        )}
        {renderQuestion('优势是什么？')}
        {renderAnswer(
          '节能效果显著',
          [
            '变频空调是在常规空调的结构上增加了一个变频器，由于变频空调通过内装变频器，随时调节空调机心脏——压缩机的运转速度，从而做到合理使用能源；',
            '由于它的压缩机不会频繁开启，会使压缩机保持稳定的工作状态，这可以使空调整体达到节能30%以上的效果。同时，这对噪音的减少和延长空调使用寿命，有相当明显的作用；',
            '月兔新一级变频VA款APF值高达5.26，高于国家新能效一级能效机型标准，更节能更省电。 ',
          ]
        )}
        {renderAnswer(
          '制冷制热速度快',
          [
            '变频空调制冷、制热的速度比常规空调快。变频空调采用微处理器可以根据设置在膨胀阀进出口、压缩机吸气管等多处的温度传感器收集的信息来控制阀门的开启度，压缩机频率高，以达到快速制冷、制热的目的。',
            '月兔新一级变频VA款采用一体成型外观设计，年轻简约百搭，不仅外观出众，制冷制热速度更快。'
          ]
        )}
        {renderAnswer(
          '变频运行噪音低',
          [
            '噪声低，因为变频空调采用的是变频压缩机，大大降低了回旋不平衡度，使室外机的振动非常小。',
            '月兔新一级变频VA款：运行噪音低至18分贝，守护每晚安静睡眠；',
            '一键ECO节能模式；高密度顶部抽取式过滤网，不仅有效防尘保护健康，抽取清洗更方便；',
            '除此之外，高温自清洁，舒睡模式等科技体验。'
          ]
        )}
        {renderAnswer(
          '变频空调温度恒定',
          [
            '传统空调压缩机依靠其不断地“开、停”来调整室内温度，其一开一停之间容易造成室温忽冷忽热，并消耗较多电能。而变频空调则依靠压缩机转速的快慢达到控制室温的目的，保持与冷量损失相平衡的低频运转，使室内温度保持稳定，电能消耗少，舒适度大大提高。',
            '月兔新一级变频VA款采用变频高效压缩机，低震动，低噪音，运行更稳定更高效。'
          ]
        )}
        {renderImg('/images/question/AC-V.png','月兔新一级变频VA款')}
        {renderQuestion('夏天使用空调前如何清洁和保养？')}
        {renderAnswer(
          '我们先来了解一下变频空调是如何工作的？',
          '进入5月，气温逐渐升高，经过一个冬天的休眠，空调即将进入夏季频繁工作中。空调换季使用会发现，其制冷、制热效果会下降，且还伴有一些怪味，常常会感到头晕、乏力等症状。<br/>那么为什么会出现上述现象？这是因为空调是在密闭的环境下工作的，空调经过一个冬季的运行，人身的代谢物、生活过程产生的废气、尘埃等物质会使室内空气质量下降，这些物质会牢固的集结在空调器室内机过滤网及蒸发器翅片上，当空调再次工作时，影响空调的制冷、制热效果，更重要的是这些污垢和污染物带有细菌，这些细菌在一定条件下就会很快分散到室内空气中，使空气细菌含量上升，长期在这种环境中生活，人们就易染上疾病，那么如何解决上述的问题呢？'
        )}
        {renderAnswer(
          '清洁系统',
          '很多空调是含有清洗系统的，可以达到初步清洁的目的。尤其是空气质量较低时，会有相应的警示声提醒，一旦机器系统提醒空气质量不佳，及时采取清洁系统，进行初步清洁，虽然没有明显的清洗效果，但是能够初步抵御细菌病毒的蔓延。'
        )}
        {renderAnswer(
          '清理滤网',
          '<p class="mb-3">当我们空调使用久了，滤网中会过滤掉很多灰尘和杂质，在夏天使用空调之前，可以通过清洁过滤网的方式，改善空气质量。</p><div class="pl-1">1. 首先切记将空调插座拔掉，确保断开电源。<br/> 2. 将空调前盖打开，可以看到前盖上有两个扣板，接着用手扣住面板的两端，用力 向外拉开，就可以将空调前盖打开，此时可以看到过滤网。<br/>3. 看到过滤网之后，不要把过滤网拆开，建议先用小型吸尘器或吹风机把过滤网内部灰尘轻轻吹一吹。<br/>4. 过滤网两侧有卡扣的，接着握住过滤网，将两边卡扣往上轻轻一提，过滤网会拿出来，注意不可以太有力，以免过滤网造成损伤。<br/>5. 将过滤网取下后，先用清水将过滤网的灰尘、污渍擦洗干净，若有油污或是顽固污渍比较难去除的话，建议用中性的清洗剂进行清洗，放在阴凉处阴干。<br/>6. 过滤网清洗好了，接着按原路重新安装回去，盖上前盖时要听到咔嚓的一声，若没有咔嚓的一声，证明孔位和卡槽没有对准，这个情况要重新安装。</div>'
        )}
        {renderAnswer(
          '专业团队',
          '空调内的细菌大多潜伏在空调内部的蒸发器和冷凝器中，还是缝隙角落中，而不管是蒸发器还是冷凝器，原材料都是铝片，经不起碰撞和腐蚀，所以自行操作清洗，很容易损坏零件，建议找一家专业的机构，针对空调、甲醛、螨虫等污染物，进行全面性的治理。专业又有效的清除卫生隐患。'
        )}
        {renderImg('/images/question/AC-Q.png','月兔新一级Q系列：高温自清洁')}
      </div>
    </>
  )
}

QueationPage.getLayout = page => (
  <SupportLayout>
    {page}
  </SupportLayout>
)