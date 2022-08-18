
import {Button, Cell,CellGroup} from 'vant'

const  initVantUI = (app:any)=> {
  app.use(Button);
  app.use(Cell)
  app.use(CellGroup)
}

export default initVantUI