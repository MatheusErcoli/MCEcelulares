import Produto from "../models/Produto";

interface ProductFilters {
  id_categoria?: number;
  id_marca?: number;
  destaque?: boolean;
}

export default class ProductService {
  
  private static buildFilters(filters: ProductFilters): Record<string, any> {
    const where: Record<string, any> = {};
    
    if (filters.id_categoria) where.id_categoria = filters.id_categoria;
    if (filters.id_marca) where.id_marca = filters.id_marca;
    if (filters.destaque) where.destaque = filters.destaque;
    
    return where;
  }

  static async getProducts(limit: number, offset: number, filters: ProductFilters) {
    const whereClause = this.buildFilters(filters);
    
    return await Produto.findAndCountAll({
      where: whereClause,
      include: ["marca", "categoria"],
      limit,
      offset,
      order: [["id_produto", "ASC"]],
    });
  }
  
}