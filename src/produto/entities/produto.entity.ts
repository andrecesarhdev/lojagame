import { IsNotEmpty, IsPositive } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity({ name: 'tb_produtos' }) // Define o nome da tabela no banco de dados
export class Produto {
  @PrimaryGeneratedColumn() // Chave primária gerada automaticamente
  id: number;

  @IsNotEmpty() // Valida que o campo não pode ser vazio
  @Column({ length: 100, nullable: false }) // Coluna do tipo string, máximo 100 caracteres, obrigatória
  nome: string;

  @IsNotEmpty() // Valida que o campo não pode ser vazio
  @Column({ length: 1000, nullable: false }) // Coluna do tipo string, máximo 1000 caracteres, obrigatória
  descricao: string;

  @IsNotEmpty()
  @IsPositive()
  @Column()
  preco: number;

  @IsNotEmpty()
  @IsPositive()
  @Column()
  QtdEstoque: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: 'CASCADE',
  })
  categoria: Categoria;
}
