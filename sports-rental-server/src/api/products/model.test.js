import { Products } from '.'

let products

beforeEach(async () => {
  products = await Products.create({ name: 'test', title: 'test', description: 'test', thumb_image: 'test', images: 'test', is_available: 'test', available_count: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = products.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(products.id)
    expect(view.name).toBe(products.name)
    expect(view.title).toBe(products.title)
    expect(view.description).toBe(products.description)
    expect(view.thumb_image).toBe(products.thumb_image)
    expect(view.images).toBe(products.images)
    expect(view.is_available).toBe(products.is_available)
    expect(view.available_count).toBe(products.available_count)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = products.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(products.id)
    expect(view.name).toBe(products.name)
    expect(view.title).toBe(products.title)
    expect(view.description).toBe(products.description)
    expect(view.thumb_image).toBe(products.thumb_image)
    expect(view.images).toBe(products.images)
    expect(view.is_available).toBe(products.is_available)
    expect(view.available_count).toBe(products.available_count)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
