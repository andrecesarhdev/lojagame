import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';

@Entity({ name: 'tb_categorias' })
export class Categoria {
  @PrimaryGeneratedColumn() // Gera chave primeira da tabela
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  descricao: string;

  //Relacionamento entre as tabelas categoria e produto
  @OneToMany(() => Produto, (produto) => produto.categoria)
  produto: Produto[];
}
