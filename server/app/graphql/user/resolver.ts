import * as DataLoader from 'dataloader'
import { Service } from 'egg'

export default class UserConnector extends Service {
  constructor(ctx) {
    super(ctx)
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch(ids) {
    const users = this.ctx.app.model.User.findAll({
      where: {
        id: {
          $in: ids,
        },
      },
    }).then(us => us.map(u => u.toJSON()))
    return users
  }

  fetchByIds(ids) {
    return this.loader.loadMany(ids)
  }

  fetchById(id) {
    return this.loader.load(id)
  }
}
