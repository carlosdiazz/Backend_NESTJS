import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo')
  newEndpoint() {
    return 'AA';
  }

  @Get('products')
  getProducts(@Query() params: any) {
    const { limit, offset } = params;
    return `Productos Limit => ${limit} Offest => ${offset}`;
  }

  @Get('categories')
  getCategories(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return `Productos Limit => ${limit} Offest => ${offset}`;
  }

  @Get('product/:id')
  getProduct(@Param() params: any) {
    return `Productos ${params.id}`;
  }

  @Get('tareas/:idTask')
  getTareas(@Param('idTask') idTask: string) {
    return `Tarea => ${idTask}`;
  }

  @Get('categorie/:idCategories/tareas/:idTask')
  getCategorie(
    @Param('idTask') idTask: string,
    @Param('idCategories') idCategories: string,
  ) {
    return `Categorie => ${idCategories} Tarea => ${idTask}`;
  }
}
