CREATE DATABASE Lolah_Amigurumi;
USE Lolah_Amigurumi;

CREATE TABLE Cliente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100),
    Email VARCHAR(100),
    Senha VARCHAR(100)
);

CREATE TABLE Carrinho (
    id INT PRIMARY KEY AUTO_INCREMENT,
    FK_cliente_id INT,
    Total FLOAT,
    FOREIGN KEY (FK_cliente_id) REFERENCES Cliente(id)
);

CREATE TABLE Pedido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Valor FLOAT,
    Data DATE,
    FK_carrinho_id INT,
    FOREIGN KEY (FK_carrinho_id) REFERENCES Carrinho(id)
);

CREATE TABLE Categoria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100)
);

CREATE TABLE Produto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100),
    Valor FLOAT
);

CREATE TABLE Produto_Categoria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    FK_produto_id INT,
    FK_categoria_id INT,
    FOREIGN KEY (FK_produto_id) REFERENCES Produto(id),
    FOREIGN KEY (FK_categoria_id) REFERENCES Categoria(id)
);

CREATE TABLE Item_Pedido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Quantidade INT,
    FK_pedido_id INT,
    FK_produto_id INT,
    FOREIGN KEY (FK_pedido_id) REFERENCES Pedido(id),
    FOREIGN KEY (FK_produto_id) REFERENCES Produto(id)
);
  
  
INSERT INTO Cliente (id, Nome, Email, Senha) VALUES
(1, 'Ana Silva', 'ana@gmail.com', 'ana123'),
(2, 'Beatriz Souza', 'bia@gmail.com', 'bia456'),
(3, 'Carolina Lima', 'carol@gmail.com', 'carol789'),
(4, 'Daniel Oliveira', 'daniel@gmail.com', 'daniel321'),
(5, 'Eduarda Santos', 'eduarda@gmail.com', 'eduarda654');

INSERT INTO Categoria (id, Nome) VALUES
(1, 'Diferentoes'),
(2, 'Personagens'),
(3, 'Animais'),
(4, 'Coloridos'),
(5, 'Pintinhos');

INSERT INTO Produto (id, Nome, Valor) VALUES
(1, 'Gato Amigurumi', 20.00),
(2, 'Peixe Amigurumi', 25.00),
(3, 'Pinguim Amigurumi', 18.00),
(4, 'Coelho Amigurumi', 26.00),
(5, 'Calopsita Amigurumi', 19.00);

INSERT INTO Produto_Categoria (id, FK_produto_id, FK_categoria_id) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5);

INSERT INTO Carrinho (id, FK_cliente_id, Total) VALUES
(1, 1, 20.00),
(2, 2, 25.00),
(3, 3, 18.00),
(4, 4, 15.00),
(5, 5, 30.00);


INSERT INTO Pedido (id, Valor, Data, FK_carrinho_id) VALUES
(1, 20.00, '2026-09-01', 1),
(2, 25.00, '2026-09-02', 2),
(3, 18.00, '2026-09-03', 3),
(4, 15.00, '2026-09-04', 4),
(5, 30.00, '2026-09-05', 5);


INSERT INTO Item_Pedido (id, Quantidade, FK_pedido_id, FK_produto_id) VALUES
(1, 1, 1, 1),
(2, 1, 2, 2),
(3, 1, 3, 3),
(4, 1, 4, 4),
(5, 1, 5, 5);