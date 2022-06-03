import count from "./js/count";
import sum from "./js/sum";

// 引入Css资源，Webpack会自动把Css资源打包到dist/main.js中
import './css/index.css'
import "./less/index.less";

console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));