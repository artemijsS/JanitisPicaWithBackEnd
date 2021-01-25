const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.orders.create(data, { files });
    } else {
      entity = await strapi.services.orders.create(ctx.request.body);
    }

    const fetch = require('node-fetch');


    // console.log(entity)
    const body = {
      name: entity.title,
      assignees: [
        6764153
      ],
      due_date: Math.floor(new Date().getTime()/1000.0) + '000',
      priority: 3,
      description: entity.description
    }
    console.log(body)

    async function postData(url = '') {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'pk_6764153_4995V2GZLEFID52PTAQNR48E4P9XNPA9',
        },
        body: JSON.stringify(body)
      });
      return response.json();
    }
    ///api/v2/list/44542033/task
    await postData('https://api.clickup.com/api/v2/list/44542033/task');




    return sanitizeEntity(entity, { model: strapi.models.orders });
  },
};
