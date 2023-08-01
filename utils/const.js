const MENU = [
  {
    menu: '关于月兔',
    path: '/about/introduction',
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
    path: '/product',
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
    path: '/support/question',
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
    path: '/join-us/hiring',
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
    path: 'https://mall.jd.com/index-774077.html',
    target: '_blank',
    external: true,
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

export const MENU_EN = [
  {
    menu: 'About Us',
    path: '/about/introduction',
    submenu: [
      {
        name: 'Company Introduction',
        path: '/about/introduction'
      },
      {
        name: 'History',
        path: '/about/timeline'
      }
    ]
  },
  {
    menu: 'Products',
    path: '/product'
  },
  {
    menu: 'Global',
    path: '/global'
  },
  {
    menu: 'Service',
    path: '/support/contact-us',
    submenu: [
      {
        name: 'Contact Us',
        path: '/support/contact-us'
      },
      {
        name: 'Online Feedback',
        path: '#online_feedback'
      }
    ]
  },
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

export const WORLD_LIST = [
  {
    label: 'North America',
    value: 'northAmerica',
    priority: 0,
    offest: [2.3, 2.2],
  },
  {
    label: 'Latin America',
    value: 'latinAmerica',
    offest: [1.8, 2],
    priority: 4
  },
  {
    label: 'Europe',
    value: 'europe',
    priority: 3
  },
  {
    label: 'Middle East',
    value: 'middleEast',
    offest: [2.1, 2.4],
    priority: 6
  },
  {
    label: 'Africa',
    value: 'africa',
    offest: [2, 2.4],
    priority: 2
  },
  {
    label: 'Asia',
    value: 'asia',
    offest: [2, 2.4],
    priority: 1
  },
  {
    label: 'Oceania',
    value: 'oceania',
    offest: [2.05, 2],
    priority: 5
  }
] 

import productTypeList_ZH from './json/product/zh.json';
import productTypeList_EN from './json/product/en.json';


export const PRODUCT_TYPE_LIST_ZH = productTypeList_ZH
export const PRODUCT_TYPE_LIST_EN = productTypeList_EN


import jobList from './json/job.json';

export const JOB_LIST = jobList

import newsList from './json/news/index.json';

export const NEWS_LIST = newsList.sort((a,b)=>(new Date(b.time).getTime()-new Date(a.time).getTime()))


export const RECOMMEND_NEWS = ['3','4','5','6']

