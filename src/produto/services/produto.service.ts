import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { CategoriaService } from '../../categoria/services/categoria.service';
import { Produto } from '../entities/produto.entity';
@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    //Essa prática implementa os princípios de inversão de controle
    private produtoRepository: Repository<Produto>,
    private categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findById(id: number): Promise<Produto> {
    // procura no banco de dados pela postagem e guarda resultado na variavel
    const produto = await this.produtoRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
      },
    });
    // Se nao achou a postagem ali em cima da um erro de "Não encontrado " pro usuario.
    if (!produto) {
      throw new HttpException(
        'O produto nao foi encontrado',
        HttpStatus.NOT_FOUND,
      );
    }
    // Se achou a postagem la em cima, devolve ela pro usuario
    return produto;
  }
  async findAllByNome(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        categoria: true,
      },
    });
  }
  async create(produto: Produto): Promise<Produto> {
    await this.categoriaService.findById(produto.categoria.id);
    return await this.produtoRepository.save(produto);
  }

  //Atuliaza uma produto
  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);
    await this.categoriaService.findById(produto.categoria.id);
    return await this.produtoRepository.save(produto);
  }
  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.produtoRepository.delete(id);
  }
}
