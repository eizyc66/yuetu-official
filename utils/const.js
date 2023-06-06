const MENU = [
  {
    menu: '关于月兔',
    visible: ['header', 'footer'],
    submenu: [
      {
        name: '集团介绍',
        list: [
          {
            name: '集团介绍',
            path: '/about/introduction#集团介绍'
          },
          {
            name: '宁化基地',
            path: '/about/introduction#宁化基地'
          },
          {
            name: '马鞍山基地',
            path: '/about/introduction#马鞍山基地'
          },
        ],
        path: '/about/introduction'
      },
      {
        name: '品牌故事 / 发展历程',
        path: '/about/timeline'
      },
      {
        name: '集团荣誉',
        path: '/about/honor'
      },
      {
        name: '集团资讯',
        path: '/about/news'
      }
    ]
  },
  {
    menu: '产品中心',
    visible: ['header', 'footer'],
    submenu: [
      {
        name: '家用空调',
        list: [
          {
            name: '挂机空调',
            path: '/product/household-AC?category=hanging'
          },
          {
            name: '柜机空调',
            path: '/product/household-AC?category=cabinet'
          }
        ],
        path: '/product/household-AC'
      },
      {
        name: '商用空调',
        list: [
          {
            name: '天花机',
            path: '/product/commercial-AC?category=ceiling'
          },
          {
            name: '风管机',
            path: '/product/commercial-AC?category=duct'
          }
        ],
        path: '/product/commercial-AC'
      },
      {
        name: '特种空调',
        list: [
          {
            name: '热泵烘干机系列',
            path: '/product/special-AC?category=dryer'
          },
          {
            name: '驻车空调系列',
            path: '/product/special-AC?category=parking'
          }
        ],
        path: '/product/special-AC'
      }
    ]
  },
  {
    menu: '服务支持',
    visible: ['header', 'footer'],
    submenu: [
      {
        name: '售后服务',
        path: '/support/question'
      }
    ]
  },
  {
    menu: '加入月兔',
    visible: ['header', 'footer'],
    submenu: [
      {
        name: '月兔招聘',
        path: '/join-us/hiring'
      },
      {
        name: '代理商入驻',
        path: '/join-us/agent'
      },
      {
        name: '战略合作',
        path: '/join-us/cooperation'
      }
    ],
  },
  {
    menu: '官方商城',
    visible: ['header'],
    submenu: [
      {
        name: '京东旗舰店',
        path: 'https://mall.jd.com/index-774077.html',
        target: '_blank',
        external: true
      }
    ],
  }
]

export const MENU_HEADER = MENU.filter(item=>item.visible.includes('header'))
export const MENU_FOOTER = MENU.filter(item=>item.visible.includes('footer'))


export const FIXED_FREQUENCY_ERR_CODE = [
  {
    code: 'E0 / E7',
    name: '主板过零故障'
  },
  {
    code: 'E1',
    name: '塑封传感器故障'
  },
  {
    code: 'E2',
    name: '铜封传感器故障'
  },
  {
    code: 'E3 / E6',
    name: '电机反馈故障'
  },
  {
    code: 'EP',
    name: '应急开关反馈故障'
  },
]

export const FREQUENCY_ERR_CODE = [
  {
    code: 'EE',
    name: '室内机EE故障'
  },
  {
    code: 'E1',
    name: '室内风机故障'
  },
  {
    code: 'E3',
    name: '室内盘温度传感器故障'
  },
  {
    code: 'E4',
    name: '室内环境温度传感器故障'
  },
  {
    code: 'E0',
    name: '室外EE故障'
  },
  {
    code: 'E6',
    name: '室内外通信故障'
  },
  {
    code: 'F1',
    name: '压缩机启动异常'
  },
  {
    code: 'F2',
    name: '压缩机失步故障'
  },
  {
    code: 'F3',
    name: 'IPM模块故障'
  },
  {
    code: 'F7',
    name: '室外盘温度传感器故障'
  },
  {
    code: 'F8',
    name: '室外环境温度传感器故障'
  },
  {
    code: 'F9',
    name: '室外直流风机故障'
  }
]

export const HOT_AIR_BLOWER_ERR_CODE = [
  {
    code: 'EE',
    name: '室内机EE故障'
  },
  {
    code: 'E1',
    name: '室内风机故障'
  },
  {
    code: 'E2',
    name: '室内主板过零信号检测异常'
  },
  {
    code: 'E3',
    name: '室内盘温度传感器故障'
  },
  {
    code: 'E4',
    name: '室内环境温度传感器故障'
  },
  {
    code: 'E5',
    name: '显示板通信故障'
  },
  {
    code: 'E0',
    name: '室外EE故障'
  },
  {
    code: 'E6',
    name: '室内外通信故障'
  },
  {
    code: 'E7',
    name: '室外主控芯片与驱动芯片故障'
  },
  {
    code: 'F1',
    name: '压缩机启动异常'
  },
  {
    code: 'F2',
    name: '压缩机失步故障'
  },
  {
    code: 'F3',
    name: 'IPM模块故障'
  },
  {
    code: 'F5',
    name: '室外排气温度传感器故障'
  },
  {
    code: 'F7',
    name: '室外盘温度传感器故障'
  },
  {
    code: 'F8',
    name: '室外环境温度传感器故障'
  },
  {
    code: 'F9',
    name: '室外直流风机故障'
  }
]

import productTypeList from './json/product/index.json';

export const PRODUCT_TYPE_LIST = productTypeList

import jobList from './json/job.json';

export const JOB_LIST = jobList

import newsList from './json/news/index.json';

export const NEWS_LIST = newsList


export const RECOMMEND_NEWS = ['3','4','5','6']

