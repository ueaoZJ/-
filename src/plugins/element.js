import Vue from 'vue'
import {
  Button, Form, FormItem, Input, Card,
  Message, MessageBox, Row, Col, Container,
  Header, Footer, Radio, RadioButton, RadioGroup,
  Menu, MenuItem, MenuItemGroup, Submenu,
  Aside, Main, Breadcrumb, BreadcrumbItem,
  Table, TableColumn, Switch, Tooltip,
  Pagination, Dialog, Select, Option
} from 'element-ui'
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Pagination)
Vue.use(Switch)
Vue.use(Table)
Vue.use(Tooltip)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Container)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Radio)
Vue.use(RadioButton)
Vue.use(RadioGroup)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
