
import {Button, Cell,CellGroup,Tab, Tabs } from 'vant'
import 'vant/lib/index.css'
const  initVantUI = (app:any)=> {
  app.use(Button);
  app.use(Cell)
  app.use(CellGroup)
  app.use(Tab)
  app.use(Tabs)

}

export default initVantUI