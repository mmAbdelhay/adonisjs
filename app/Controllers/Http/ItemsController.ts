import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { commonResponse } from '../commonResponse';
import Item from '../../Models/Item';

export default class ItemsController {
  public async index() {
    return commonResponse('Items', await Item.all(), 200);
  }

  public async store({ request }: HttpContextContract) {
    const body = request.body();
    const item = await Item.create(body);
    return commonResponse(
      item ? 'Item created successfully' : 'Item not created successfully',
      item ?? 'Item not created successfully',
      201
    );
  }

  public async show({ params }: HttpContextContract) {
    const item = await Item.findOrFail(params.id);
    return commonResponse('Item', item ?? 'no item found by this name', 201);
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body;
    const item = await Item.findOrFail(params.name);
    item.name = body.name;
    const newItem = await item.save();
    return commonResponse(
      newItem ? 'Item updated successfully' : 'Item not updated',
      newItem ?? 'Item not updated',
      203
    );
  }

  public async destroy({ params }: HttpContextContract) {
    const item = await Item.findOrFail(params.id);
    await item.delete();
    return commonResponse(
      item ? 'Item deleted successfully' : 'Item not deleted',
      item ?? 'Item not deleted',
      204
    );
  }
}
