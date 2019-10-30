import mongoose, { Schema } from 'mongoose';

const productsSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    thumb_image: {
      type: String
    },
    images: {
      type: String
    },
    is_available: {
      type: String
    },
    available_count: {
      type: String
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      }
    }
  }
);

productsSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      title: this.title,
      description: this.description,
      thumb_image: this.thumb_image,
      images: this.images,
      is_available: this.is_available,
      available_count: this.available_count,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return full
      ? {
          ...view
          // add properties for a full view
        }
      : view;
  }
};

const model = mongoose.model('Products', productsSchema);

export const schema = model.schema;
export default model;
