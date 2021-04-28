class PromisePool {
  constructor(max, fn) {
    this.max = max;
    this.fn = fn;
    this.pool = [];
    this.urls = [];
  }
  start(urlArr) {
    this.urls = urlArr;
    if(this.pool.length < this.max) {
      let url = this.urls.shift();
      this.setTask(url);
    }
    // 利用Promise.race来获取线程中请求完成的信号
    let race = Promise.race(this.pool);
    return this.run(race);
  }
  run(race) {
    race.then(res => {
      // 当进程池跑完一个任务时，再添加一个任务进去;
      let url = this.urls.shift();
      this.setTask(url);
      return this.run(Promise.race(this.pool));
    })
  }
  setTask(url) {
    if(!url) return;
    let task = this.fn(url);
    this.pool.push(task);
    console.log(this.pool);
    task.then(res => {
      // 当请求成功后，从线程池移除该请求
      this.pool.splice(this.pool.indexOf(task), 1);
      console.log(this.pool, res)
    })
  }
}

const urlArr = [
  'bytedance.com',
  'tencent.com',
  'microsoft.com',
  'apple.com',
  'huhu.com',
  'amazon.com'
]

let dur = 0;

/** 
 * 自定义请求函数
*/
const requestFn = (url) => {
  return new Promise(resolve => {
    setTimeout(_ => {
      resolve(`${url}请求完成`)
    }, 100*dur++)
  })
}
const pool = new PromisePool(3, requestFn); // 并发数量为3
pool.start(urlArr);