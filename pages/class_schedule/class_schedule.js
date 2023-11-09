//color schemes
var colors =  [
  "#AEEC34",
  "#FFC44F",
  "#85B0FD",
  "#FEA17C",
  "#FF9392",
  "#D48DF9",
  "#7FCFF8",
  "#85B8CF", 
  "#90C652", 
  "#D8AA5A", 
  "#FC9F9D", 
  "#0A9A84", 
  "#61BC69", 
  "#12AEF3", 
  "#E29AAD"]
const app = getApp()

Page({

  /**
   * The initial data of the page
   */
  data: {
    show : false,
    weekArray: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周', '第19周', '第20周', '第21周'],
    pageNum: 0, // 当前所在分类的索引
    todayDay: '', // 今日日期
    todayMonth:'', // 今日月份
    todayWeek:'', // 今日周
    day:'', // 日期
    month: '', // 月份
    monthNum:1,
    week: ['日','一', '二', '三', '四', '五', '六'], // 周日为起始日
    nowDay:[1,2,3,4,5,6,7], // 本周的七天日期
    schoolTime: ['2022','02','28'], // 本学期开学时间
    nowWeek: '', // 当前周
    course_time:[
      ['8:40',''],
      ['','10:00'],
      ['10:30',''],
      ['','11:50'],
      ['14:00',''],
      ['','15:20'],
      ['15:50',''],
      ['','17:10'],
      ['18:30',''],
  ],
    wList: [

    [     //第一周 
   
        { "id":2,"isToday": 1, "jie": 3, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
        { "id":3,"isToday": 1, "jie": 5, "classNumber": 2, "name": "篮球初级","address":"6202" },

        { "id":4,"isToday": 2, "jie": 1, "classNumber": 2, "name": "运动急救" ,"address":"2306" },
        { "id":2,"isToday": 2, "jie": 5, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
        {"id":7,"isToday": 2, "jie": 3, "classNumber": 2, "name": "太极拳","address":"1215"},

        { "id":6,"isToday": 3, "jie": 1, "classNumber": 2, "name": "自由泳" ,"address":"5102" },
       { "id":3,"isToday": 3, "jie": 5, "classNumber": 2, "name": "篮球初级" ,"address":"6202" },
     
       { "id":5,"isToday": 4, "jie": 5, "classNumber": 2, "name": "武术原理及实战" ,"address":"2306" },

         { "id":1,"isToday": 5, "jie": 1, "classNumber": 2, "name": "基础体能" ,"address":"5506" },
        { "id":6,"isToday": 5, "jie": 3, "classNumber": 2, "name": "武术原理及实战" ,"address":"5102" },
        

   ],
      [      //第二
     { "id":1,"isToday": 1, "jie": 7, "classNumber": 2, "name": "基础体能","address":"2306" },
  
        { "id":2,"isToday": 1, "jie": 3, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
        { "id":3,"isToday": 1, "jie": 5, "classNumber": 2, "name": "篮球初级","address":"6202" },
        {"id":7,"isToday": 2, "jie": 3, "classNumber": 2, "name": "太极拳","address":"未知"},
        { "id":4,"isToday": 2, "jie": 1, "classNumber": 2, "name": "运动急救" ,"address":"2306" },
        { "id":2,"isToday": 2, "jie": 5, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },

        { "id":6,"isToday": 3, "jie": 1, "classNumber": 2, "name": "自由泳" ,"address":"5102" },
       { "id":3,"isToday": 3, "jie": 5, "classNumber": 2, "name": "篮球初级" ,"address":"6202" },
     
       { "id":5,"isToday": 4, "jie": 5, "classNumber": 2, "name": "自由泳" ,"address":"2304" },

         { "id":1,"isToday": 5, "jie": 1, "classNumber": 2, "name": "基础体能" ,"address":"5506" },
        { "id":6,"isToday": 5, "jie": 3, "classNumber": 2, "name": "武术原理及实战" ,"address":"5102" },],
        [     //第三周 
   
          { "id":2,"isToday": 1, "jie": 3, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
          { "id":3,"isToday": 1, "jie": 5, "classNumber": 2, "name": "篮球初级","address":"6202" },
          {"id":7,"isToday": 2, "jie": 3, "classNumber": 2, "name": "太极拳","address":"未知"},
          { "id":4,"isToday": 2, "jie": 1, "classNumber": 2, "name": "运动急救" ,"address":"2306" },
          { "id":2,"isToday": 2, "jie": 5, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
  
          { "id":6,"isToday": 3, "jie": 1, "classNumber": 2, "name": "自由泳" ,"address":"5102" },
         { "id":3,"isToday": 3, "jie": 5, "classNumber": 2, "name": "篮球初级" ,"address":"6202" },
       
         { "id":5,"isToday": 4, "jie": 5, "classNumber": 2, "name": "武术原理及实战" ,"address":"2306" },
  
           { "id":1,"isToday": 5, "jie": 1, "classNumber": 2, "name": "基础体能" ,"address":"5506" },
          { "id":6,"isToday": 5, "jie": 3, "classNumber": 2, "name": "武术原理及实战" ,"address":"5102" },
          
  
     ],
        [      //第四
       { "id":1,"isToday": 1, "jie": 7, "classNumber": 2, "name": "基础体能","address":"2306" },
       {"id":7,"isToday": 2, "jie": 3, "classNumber": 2, "name": "太极拳","address":"未知"},
          { "id":2,"isToday": 1, "jie": 3, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
          { "id":3,"isToday": 1, "jie": 5, "classNumber": 2, "name": "篮球初级","address":"6202" },
  
          { "id":4,"isToday": 2, "jie": 1, "classNumber": 2, "name": "运动急救" ,"address":"2306" },
          { "id":2,"isToday": 2, "jie": 5, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
  
          { "id":6,"isToday": 3, "jie": 1, "classNumber": 2, "name": "自由泳" ,"address":"5102" },
         { "id":3,"isToday": 3, "jie": 5, "classNumber": 2, "name": "篮球初级" ,"address":"6202" },
       
         { "id":5,"isToday": 4, "jie": 5, "classNumber": 2, "name": "自由泳" ,"address":"2304" },
  
           { "id":1,"isToday": 5, "jie": 1, "classNumber": 2, "name": "基础体能" ,"address":"5506" },
          { "id":6,"isToday": 5, "jie": 3, "classNumber": 2, "name": "武术原理及实战" ,"address":"5102" },],
          [     //第5周 
   
            { "id":2,"isToday": 1, "jie": 3, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
            { "id":3,"isToday": 1, "jie": 5, "classNumber": 2, "name": "篮球初级","address":"6202" },
            {"id":7,"isToday": 3, "jie": 3, "classNumber": 2, "name": "太极拳","address":"未知"},
            { "id":4,"isToday": 2, "jie": 1, "classNumber": 2, "name": "运动急救" ,"address":"2306" },
            { "id":2,"isToday": 2, "jie": 5, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
    
            { "id":6,"isToday": 3, "jie": 1, "classNumber": 2, "name": "自由泳" ,"address":"5102" },
           { "id":3,"isToday": 3, "jie": 5, "classNumber": 2, "name": "篮球初级" ,"address":"6202" },
         
           { "id":5,"isToday": 4, "jie": 5, "classNumber": 2, "name": "武术原理及实战" ,"address":"2306" },
    
             { "id":1,"isToday": 5, "jie": 1, "classNumber": 2, "name": "基础体能" ,"address":"5506" },
            { "id":6,"isToday": 5, "jie": 3, "classNumber": 2, "name": "武术原理及实战" ,"address":"5102" },
            
    
       ],
          [      //第6
         { "id":1,"isToday": 1, "jie": 7, "classNumber": 2, "name": "基础体能","address":"2306" },
      
            { "id":2,"isToday": 1, "jie": 3, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
            { "id":3,"isToday": 1, "jie": 5, "classNumber": 2, "name": "篮球初级","address":"6202" },
            {"id":7,"isToday": 3, "jie": 3, "classNumber": 2, "name": "太极拳","address":"未知"},
            { "id":4,"isToday": 2, "jie": 1, "classNumber": 2, "name": "运动急救" ,"address":"2306" },
            { "id":2,"isToday": 2, "jie": 5, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
    
            { "id":6,"isToday": 3, "jie": 1, "classNumber": 2, "name": "自由泳" ,"address":"5102" },
           { "id":3,"isToday": 3, "jie": 5, "classNumber": 2, "name": "篮球初级" ,"address":"6202" },
         
           { "id":5,"isToday": 4, "jie": 5, "classNumber": 2, "name": "自由泳" ,"address":"2304" },
    
             { "id":1,"isToday": 5, "jie": 1, "classNumber": 2, "name": "基础体能" ,"address":"5506" },
            { "id":6,"isToday": 5, "jie": 3, "classNumber": 2, "name": "武术原理及实战" ,"address":"5102" },],
            [     //第7周 
   
              { "id":2,"isToday": 1, "jie": 3, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
              { "id":3,"isToday": 1, "jie": 5, "classNumber": 2, "name": "篮球初级","address":"6202" },
              {"id":7,"isToday": 3, "jie": 3, "classNumber": 2, "name": "太极拳","address":"未知"},
              { "id":4,"isToday": 2, "jie": 1, "classNumber": 2, "name": "运动急救" ,"address":"2306" },
              { "id":2,"isToday": 2, "jie": 5, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
      
              { "id":6,"isToday": 3, "jie": 1, "classNumber": 2, "name": "自由泳" ,"address":"5102" },
             { "id":3,"isToday": 3, "jie": 5, "classNumber": 2, "name": "篮球初级" ,"address":"6202" },
           
             { "id":5,"isToday": 4, "jie": 5, "classNumber": 2, "name": "武术原理及实战" ,"address":"2306" },
      
               { "id":1,"isToday": 5, "jie": 1, "classNumber": 2, "name": "基础体能" ,"address":"5506" },
              { "id":6,"isToday": 5, "jie": 3, "classNumber": 2, "name": "武术原理及实战" ,"address":"5102" },
              
      
         ],
            [      //第8
           { "id":1,"isToday": 1, "jie": 7, "classNumber": 2, "name": "基础体能","address":"2306" },
           {"id":7,"isToday": 3, "jie": 3, "classNumber": 2, "name": "太极拳","address":"未知"},
              { "id":2,"isToday": 1, "jie": 3, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
              { "id":3,"isToday": 1, "jie": 5, "classNumber": 2, "name": "篮球初级","address":"6202" },
      
              { "id":4,"isToday": 2, "jie": 1, "classNumber": 2, "name": "运动急救" ,"address":"2306" },
              { "id":2,"isToday": 2, "jie": 5, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
      
              { "id":6,"isToday": 3, "jie": 1, "classNumber": 2, "name": "自由泳" ,"address":"5102" },
             { "id":3,"isToday": 3, "jie": 5, "classNumber": 2, "name": "篮球初级" ,"address":"6202" },
           
             { "id":5,"isToday": 4, "jie": 5, "classNumber": 2, "name": "自由泳" ,"address":"2304" },
      
               { "id":1,"isToday": 5, "jie": 1, "classNumber": 2, "name": "基础体能" ,"address":"5506" },
              { "id":6,"isToday": 5, "jie": 3, "classNumber": 2, "name": "武术原理及实战" ,"address":"5102" },],
              [     //第9周 
   
                { "id":2,"isToday": 1, "jie": 3, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
                { "id":3,"isToday": 1, "jie": 5, "classNumber": 2, "name": "篮球初级","address":"6202" },
                {"id":7,"isToday": 5, "jie": 5, "classNumber": 2, "name": "太极拳","address":"未知"},
                { "id":4,"isToday": 2, "jie": 1, "classNumber": 2, "name": "运动急救" ,"address":"2306" },
                { "id":2,"isToday": 2, "jie": 5, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
        
                { "id":6,"isToday": 3, "jie": 1, "classNumber": 2, "name": "自由泳" ,"address":"5102" },
               { "id":3,"isToday": 3, "jie": 5, "classNumber": 2, "name": "篮球初级" ,"address":"6202" },
             
               { "id":5,"isToday": 4, "jie": 5, "classNumber": 2, "name": "武术原理及实战" ,"address":"2306" },
        
                 { "id":1,"isToday": 5, "jie": 1, "classNumber": 2, "name": "基础体能" ,"address":"5506" },
                { "id":6,"isToday": 5, "jie": 3, "classNumber": 2, "name": "武术原理及实战" ,"address":"5102" },
                
        
           ],
              [      //第10
             { "id":1,"isToday": 1, "jie": 7, "classNumber": 2, "name": "基础体能","address":"2306" },
          
                { "id":2,"isToday": 1, "jie": 3, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
                { "id":3,"isToday": 1, "jie": 5, "classNumber": 2, "name": "篮球初级","address":"6202" },
                {"id":7,"isToday": 5, "jie": 5, "classNumber": 2, "name": "太极拳","address":"未知"},
                { "id":4,"isToday": 2, "jie": 1, "classNumber": 2, "name": "运动急救" ,"address":"2306" },
                { "id":2,"isToday": 2, "jie": 5, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
        
                { "id":6,"isToday": 3, "jie": 1, "classNumber": 2, "name": "自由泳" ,"address":"5102" },
               { "id":3,"isToday": 3, "jie": 5, "classNumber": 2, "name": "篮球初级" ,"address":"6202" },
             
               { "id":5,"isToday": 4, "jie": 5, "classNumber": 2, "name": "自由泳" ,"address":"2304" },
        
                 { "id":1,"isToday": 5, "jie": 1, "classNumber": 2, "name": "基础体能" ,"address":"5506" },
                { "id":6,"isToday": 5, "jie": 3, "classNumber": 2, "name": "武术原理及实战" ,"address":"5102" },],
                [     //第11周 
   
                  { "id":2,"isToday": 1, "jie": 3, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
                  { "id":3,"isToday": 1, "jie": 5, "classNumber": 2, "name": "篮球初级","address":"6202" },
                  {"id":7,"isToday": 5, "jie": 5, "classNumber": 2, "name": "太极拳","address":"未知"},
                  { "id":4,"isToday": 2, "jie": 1, "classNumber": 2, "name": "运动急救" ,"address":"2306" },
                  { "id":2,"isToday": 2, "jie": 5, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
          
                  { "id":6,"isToday": 3, "jie": 1, "classNumber": 2, "name": "自由泳" ,"address":"5102" },
                 { "id":3,"isToday": 3, "jie": 5, "classNumber": 2, "name": "篮球初级" ,"address":"6202" },
               
                 { "id":5,"isToday": 4, "jie": 5, "classNumber": 2, "name": "武术原理及实战" ,"address":"2306" },
          
                   { "id":1,"isToday": 5, "jie": 1, "classNumber": 2, "name": "基础体能" ,"address":"5506" },
                  { "id":6,"isToday": 5, "jie": 3, "classNumber": 2, "name": "武术原理及实战" ,"address":"5102" },
                  
          
             ],
                [      //第12
               { "id":1,"isToday": 1, "jie": 7, "classNumber": 2, "name": "基础体能","address":"2306" },
            
                  { "id":2,"isToday": 1, "jie": 3, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
                  { "id":3,"isToday": 1, "jie": 5, "classNumber": 2, "name": "篮球初级","address":"6202" },
                  {"id":7,"isToday": 5, "jie": 5, "classNumber": 2, "name": "太极拳","address":"未知"},
                  { "id":4,"isToday": 2, "jie": 1, "classNumber": 2, "name": "运动急救" ,"address":"2306" },
                  { "id":2,"isToday": 2, "jie": 5, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
          
                  { "id":6,"isToday": 3, "jie": 1, "classNumber": 2, "name": "自由泳" ,"address":"5102" },
                 { "id":3,"isToday": 3, "jie": 5, "classNumber": 2, "name": "篮球初级" ,"address":"6202" },
               
                 { "id":5,"isToday": 4, "jie": 5, "classNumber": 2, "name": "自由泳" ,"address":"2304" },
          
                   { "id":1,"isToday": 5, "jie": 1, "classNumber": 2, "name": "基础体能" ,"address":"5506" },
                  { "id":6,"isToday": 5, "jie": 3, "classNumber": 2, "name": "武术原理及实战" ,"address":"5102" },],
                  [     //第13周 
   
                    { "id":2,"isToday": 1, "jie": 3, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
                    { "id":3,"isToday": 1, "jie": 5, "classNumber": 2, "name": "篮球初级","address":"6202" },
                    {"id":7,"isToday": 3, "jie": 3, "classNumber": 2, "name": "太极拳","address":"未知"},
                    { "id":4,"isToday": 2, "jie": 1, "classNumber": 2, "name": "运动急救" ,"address":"2306" },
                    { "id":2,"isToday": 2, "jie": 5, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
            
                    { "id":6,"isToday": 3, "jie": 1, "classNumber": 2, "name": "自由泳" ,"address":"5102" },
                   { "id":3,"isToday": 3, "jie": 5, "classNumber": 2, "name": "篮球初级" ,"address":"6202" },
                 
                   { "id":5,"isToday": 4, "jie": 5, "classNumber": 2, "name": "武术原理及实战" ,"address":"2306" },
            
                     { "id":1,"isToday": 5, "jie": 1, "classNumber": 2, "name": "基础体能" ,"address":"5506" },
                    { "id":6,"isToday": 5, "jie": 3, "classNumber": 2, "name": "武术原理及实战" ,"address":"5102" },
                    
            
               ],
                  [      //第14
                 { "id":1,"isToday": 1, "jie": 7, "classNumber": 2, "name": "基础体能","address":"2306" },
              
                    { "id":2,"isToday": 1, "jie": 3, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
                    { "id":3,"isToday": 1, "jie": 5, "classNumber": 2, "name": "篮球初级","address":"6202" },
                    {"id":7,"isToday": 3, "jie": 3, "classNumber": 2, "name": "太极拳","address":"未知"},
                    { "id":4,"isToday": 2, "jie": 1, "classNumber": 2, "name": "运动急救" ,"address":"2306" },
                    { "id":2,"isToday": 2, "jie": 5, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
            
                    { "id":6,"isToday": 3, "jie": 1, "classNumber": 2, "name": "自由泳" ,"address":"5102" },
                   { "id":3,"isToday": 3, "jie": 5, "classNumber": 2, "name": "篮球初级" ,"address":"6202" },
                 
                   { "id":5,"isToday": 4, "jie": 5, "classNumber": 2, "name": "自由泳" ,"address":"2304" },
            
                     { "id":1,"isToday": 5, "jie": 1, "classNumber": 2, "name": "基础体能" ,"address":"5506" },
                    { "id":6,"isToday": 5, "jie": 3, "classNumber": 2, "name": "武术原理及实战" ,"address":"5102" },],
                    [     //第15周 
   
                      { "id":2,"isToday": 1, "jie": 3, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
                      { "id":3,"isToday": 1, "jie": 5, "classNumber": 2, "name": "篮球初级","address":"6202" },
                      {"id":7,"isToday": 3, "jie": 3, "classNumber": 2, "name": "太极拳","address":"未知"},
                      { "id":4,"isToday": 2, "jie": 1, "classNumber": 2, "name": "运动急救" ,"address":"2306" },
                      { "id":2,"isToday": 2, "jie": 5, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
              
                      { "id":6,"isToday": 3, "jie": 1, "classNumber": 2, "name": "自由泳" ,"address":"5102" },
                     { "id":3,"isToday": 3, "jie": 5, "classNumber": 2, "name": "篮球初级" ,"address":"6202" },
                   
                     { "id":5,"isToday": 4, "jie": 5, "classNumber": 2, "name": "武术原理及实战" ,"address":"2306" },
              
                       { "id":1,"isToday": 5, "jie": 1, "classNumber": 2, "name": "基础体能" ,"address":"5506" },
                      { "id":6,"isToday": 5, "jie": 3, "classNumber": 2, "name": "武术原理及实战" ,"address":"5102" },
                      
              
                 ],
                    [      //第16
                   { "id":1,"isToday": 1, "jie": 7, "classNumber": 2, "name": "基础体能","address":"2306" },
                
                      { "id":2,"isToday": 1, "jie": 3, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
                      { "id":3,"isToday": 1, "jie": 5, "classNumber": 2, "name": "篮球初级","address":"6202" },
                      {"id":7,"isToday": 3, "jie": 3, "classNumber": 2, "name": "太极拳","address":"未知"},
                      { "id":4,"isToday": 2, "jie": 1, "classNumber": 2, "name": "运动急救" ,"address":"2306" },
                      { "id":2,"isToday": 2, "jie": 5, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
              
                      { "id":6,"isToday": 3, "jie": 1, "classNumber": 2, "name": "自由泳" ,"address":"5102" },
                     { "id":3,"isToday": 3, "jie": 5, "classNumber": 2, "name": "篮球初级" ,"address":"6202" },
                   
                     { "id":5,"isToday": 4, "jie": 5, "classNumber": 2, "name": "自由泳" ,"address":"2304" },
              
                       { "id":1,"isToday": 5, "jie": 1, "classNumber": 2, "name": "基础体能" ,"address":"5506" },
                      { "id":6,"isToday": 5, "jie": 3, "classNumber": 2, "name": "武术原理及实战" ,"address":"5102" },],
                      [     //第一周 
   
                        { "id":2,"isToday": 1, "jie": 3, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
                        { "id":3,"isToday": 1, "jie": 5, "classNumber": 2, "name": "篮球初级","address":"6202" },
                
                        { "id":4,"isToday": 2, "jie": 1, "classNumber": 2, "name": "运动急救" ,"address":"2306" },
                        { "id":2,"isToday": 2, "jie": 5, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
                
                        { "id":6,"isToday": 3, "jie": 1, "classNumber": 2, "name": "自由泳" ,"address":"5102" },
                       { "id":3,"isToday": 3, "jie": 5, "classNumber": 2, "name": "篮球初级" ,"address":"6202" },
                     
                       { "id":5,"isToday": 4, "jie": 5, "classNumber": 2, "name": "武术原理及实战" ,"address":"2306" },
                
                         { "id":1,"isToday": 5, "jie": 1, "classNumber": 2, "name": "基础体能" ,"address":"5506" },
                        { "id":6,"isToday": 5, "jie": 3, "classNumber": 2, "name": "武术原理及实战" ,"address":"5102" },
                        
                
                   ],
                      [      //第二
                     { "id":1,"isToday": 1, "jie": 7, "classNumber": 2, "name": "基础体能","address":"2306" },
                  
                        { "id":2,"isToday": 1, "jie": 3, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
                        { "id":3,"isToday": 1, "jie": 5, "classNumber": 2, "name": "篮球初级","address":"6202" },
                
                        { "id":4,"isToday": 2, "jie": 1, "classNumber": 2, "name": "运动急救" ,"address":"2306" },
                        { "id":2,"isToday": 2, "jie": 5, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
                
                        { "id":6,"isToday": 3, "jie": 1, "classNumber": 2, "name": "自由泳" ,"address":"5102" },
                       { "id":3,"isToday": 3, "jie": 5, "classNumber": 2, "name": "篮球初级" ,"address":"6202" },
                     
                       { "id":5,"isToday": 4, "jie": 5, "classNumber": 2, "name": "自由泳" ,"address":"2304" },
                
                         { "id":1,"isToday": 5, "jie": 1, "classNumber": 2, "name": "基础体能" ,"address":"5506" },
                        { "id":6,"isToday": 5, "jie": 3, "classNumber": 2, "name": "武术原理及实战" ,"address":"5102" },],
                        [     //第一周 
   
                          { "id":2,"isToday": 1, "jie": 3, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
                          { "id":3,"isToday": 1, "jie": 5, "classNumber": 2, "name": "篮球初级","address":"6202" },
                  
                          { "id":4,"isToday": 2, "jie": 1, "classNumber": 2, "name": "运动急救" ,"address":"2306" },
                          { "id":2,"isToday": 2, "jie": 5, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
                  
                          { "id":6,"isToday": 3, "jie": 1, "classNumber": 2, "name": "自由泳" ,"address":"5102" },
                         { "id":3,"isToday": 3, "jie": 5, "classNumber": 2, "name": "篮球初级" ,"address":"6202" },
                       
                         { "id":5,"isToday": 4, "jie": 5, "classNumber": 2, "name": "武术原理及实战" ,"address":"2306" },
                  
                           { "id":1,"isToday": 5, "jie": 1, "classNumber": 2, "name": "基础体能" ,"address":"5506" },
                          { "id":6,"isToday": 5, "jie": 3, "classNumber": 2, "name": "武术原理及实战" ,"address":"5102" },
                          
                  
                     ],
                        [      //第二
                       { "id":1,"isToday": 1, "jie": 7, "classNumber": 2, "name": "基础体能","address":"2306" },
                    
                          { "id":2,"isToday": 1, "jie": 3, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
                          { "id":3,"isToday": 1, "jie": 5, "classNumber": 2, "name": "篮球初级","address":"6202" },
                  
                          { "id":4,"isToday": 2, "jie": 1, "classNumber": 2, "name": "运动急救" ,"address":"2306" },
                          { "id":2,"isToday": 2, "jie": 5, "classNumber": 2, "name": "跆拳道" ,"address":"5409" },
                  
                          { "id":6,"isToday": 3, "jie": 1, "classNumber": 2, "name": "自由泳" ,"address":"5102" },
                         { "id":3,"isToday": 3, "jie": 5, "classNumber": 2, "name": "篮球初级" ,"address":"6202" },
                       
                         { "id":5,"isToday": 4, "jie": 5, "classNumber": 2, "name": "自由泳" ,"address":"2304" },
                  
                           { "id":1,"isToday": 5, "jie": 1, "classNumber": 2, "name": "基础体能" ,"address":"5506" },
                          { "id":6,"isToday": 5, "jie": 3, "classNumber": 2, "name": "武术原理及实战" ,"address":"5102" },],
 
    // otherCourse:[{"id":1,"name":"应用软件开发课程设计","time":"18-19周","address":"无","teacher":"沈华"},]
  ]},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let nowWeek = this.getNowWeek()
    let nowDay = this.getDayOfWeek(nowWeek)
    let pageNum = nowWeek - 1
    let month = this.getMonth((nowWeek - 1) * 7);
    this.data.todayMonth
    this.setData({
      nowWeek,
      nowDay,
      pageNum,
      todayWeek:nowWeek,
      monthNum: month / 1, // 当前月份数字类型，用于数字运算
      colorArrays: colors // 课表颜色
    })
    let event = {currentTarget : {dataset : {page : 0}}}
    this.changeNav(event)
  },

  // 获取第几周后的月份
  getMonth(days) {
    let [year,month,day] = this.data.schoolTime
    var date = new Date(year,month-1,day);    
    date.setDate(date.getDate() + days);//获取n天后的日期      
    var m = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);        
    return  m;     
  },

  // 获取第几周后的星期几的日期
  getDay(days) {
    let [year, month, day] = this.data.schoolTime
    var date = new Date(year, month-1, day);
    date.setDate(date.getDate() + days);//获取n天后的日期      
    var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();//获取当前几号，不足10补0    
    return d;
  },

  // 获取当前周
  getNowWeek(){
    var date = new Date();
    let [year, month, day] = this.data.schoolTime
    var start = new Date(year, month-1, day);
    //计算时间差
    var left_time = parseInt((date.getTime()-start.getTime())/1000)+24 * 60 * 60;
    var days = parseInt(left_time/3600/24);
    var week = Math.floor(days / 7) + 1;
    var result = week
    if(week>20 || week <= 0){
      result = this.data.now_week;
    }
    return result
  },

  //获取一周的日期
  getDayOfWeek(week){
    var day = []
    for (var i = -1; i < 6; i++) {
      var days = (week - 1) * 7 + i;
      day.push(this.getDay(days))
    }
    return day
  },

  // 获取课表数据
  async getCourseList(){

  },

  // 点击切换导航的回调
  changeNav(event){
    let pageNum = event.currentTarget.dataset.page
    let nowWeek = pageNum + 1
    let nowDay = this.getDayOfWeek(nowWeek)
    let month = this.getMonth((nowWeek-1)*7)
    this.setData({
      pageNum,
      nowWeek,
      nowDay,
      month,
      monthNum: month / 1, // 当前月份数字类型，用于数字运算
    })
  },

  gotobasketball: function (options) {
    wx.navigateTo({
          url: '/pages/choose_basketball/choose_basketball',//要跳转到的页面路径
  })  
  },

  goEmergency(){
     wx.navigateTo({
    url : "/pages/emergency/emergency"
     })
    this.setData({
      show : true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      todayDay: new Date().getDate(),
      todayMonth: new Date().getMonth() + 1,
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})