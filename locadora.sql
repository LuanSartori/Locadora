create database locadora;
use locadora;

create table Clientes(
	clienteID integer NOT NULL PRIMARY KEY AUTO_INCREMENT,
	clienteCPF integer(9) NOT NULL UNIQUE,
	clienteNome varchar(40) NOT NULL,
	clienteEnde varchar(60) NOT NULL,
	clienteTel varchar(15) NOT NULL,
	clienteCidade varchar(60) NOT NULL,
	clienteDataNasc date NOT NULL,
	clienteCNH bigint(11) NOT NULL,
	clienteCNHCat varchar(2) NOT NULL
);

create table Funcionarios(
	funcMatricula int(4) NOT NULL PRIMARY KEY,
	funcNome varchar(40) NOT NULL,
	funcDepto int(1) NOT NULL,
	funcSalario decimal(8,2) NOT NULL,
	funcAdmissao date NOT NULL,
	funcFilho INT(1) NOT NULL,
	funcSexo varchar(1) NOT NULL,
	funcAtivo boolean NOT NULL
);

create table Veiculos(
	veicPlaca char(7) NOT NULL PRIMARY KEY,
	veicMarca varchar(15) NOT NULL,
	veicModelo varchar(15) NOT NULL,
	veicCor varchar(15) NULL,
	veicAno int(4) NOT NULL,
	veicComb char(1) NULL,
	veicCat int(1) NULL,
	veicStatusAlocado tinyint(1) NOT NULL
);

create table Departamento( 
	deptoCod int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, 
	deptoNome varchar(20) NOT NULL 
); 

create table Categoria( 
	catCod int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, 
	catNome varchar(20) NOT NULL, 
	catValor_km decimal(8,2) NOT NULL 
); 

create table Combustivel( 
	combTipo char(1) NOT NULL PRIMARY KEY,
	combNome varchar(20) NULL 
); 

create table OrdemDeServico( 
	osNum int(11) NOT NULL PRIMARY KEY, 
	osFuncMat int(4) NOT NULL, 
	osClienteID integer NOT NULL, 
	osVeicPlaca char(7) NOT NULL, 
	osDataRetirada date NOT NULL, 
	osDataDevolucao date NULL,
	osKMDevolucao decimal(8,2) NOT NULL, 
	osStatus tinyint(1) NOT NULL, 
	osValorPgto decimal(10,2) NULL 
); 

create table Usuarios(
	usuarioLogin int(11) NOT NULL PRIMARY KEY,
	usuarioSenha varchar(8) NOT NULL, 
	usuarioFuncMat int(4) NULL, 
	usuarioSetor int(11) NOT NULL, 
	usuarioStatus tinyint (1) NULL 
);

ALTER TABLE funcionarios ADD FOREIGN KEY (funcDepto) REFERENCES departamento(deptoCod);
ALTER TABLE Veiculos ADD FOREIGN KEY (veicComb) REFERENCES Combustivel(combTipo);
ALTER TABLE Veiculos ADD FOREIGN KEY (veicCat) REFERENCES Categoria(catCod);
ALTER TABLE ordemDeServico ADD FOREIGN KEY (osVeicPlaca) REFERENCES Veiculos(veicPlaca);
ALTER TABLE ordemDeServico ADD FOREIGN KEY (osClienteID) REFERENCES clientes(clienteID);
ALTER TABLE ordemDeServico ADD FOREIGN KEY (osFuncMat) REFERENCES funcionarios(funcMatricula);
ALTER TABLE usuarios ADD FOREIGN KEY (usuarioFuncMat) REFERENCES funcionarios(funcMatricula);


DELIMITER //
CREATE TRIGGER tr_add_usuarios
AFTER INSERT ON Funcionarios
FOR EACH ROW 
BEGIN
	-- Pega o valor da data, remove os traços e armazena em uma variável
	SET @dataSenha := REPLACE((SELECT funcAdmissao FROM Funcionarios WHERE funcMatricula = NEW.funcMatricula), '-', '');
	INSERT INTO Usuarios VALUES (NEW.funcMatricula, @dataSenha, NEW.funcMatricula, NEW.funcDepto, 1);
END; // 
DELIMITER ;

DELIMITER //
CREATE TRIGGER after_alocar_veiculo
AFTER INSERT ON ordemDeServico
FOR EACH ROW
BEGIN
    -- Atualiza o status do veículo para ocupado (1) quando alocado em uma ordem de serviço
    UPDATE veiculos
    SET veicStatusAlocado = 1
    WHERE veicPlaca = NEW.osVeicPlaca;
END; //
DELIMITER ;


INSERT INTO categoria (catNome, catValor_km) VALUES ("Basico", 0.49);
INSERT INTO categoria (catNome, catValor_km) VALUES ("Utilitario", 0.51); 
INSERT INTO categoria (catNome, catValor_km) VALUES ("Luxo", 0.53); 
INSERT INTO categoria (catNome, catValor_km) VALUES ("Especial", 0.55); 
 

INSERT INTO departamento (deptoNome) VALUES ("Atendimento"); 
INSERT INTO departamento (deptoNome) VALUES ("Administrativo"); 
INSERT INTO departamento (deptoNome) VALUES ("Financeiro"); 
INSERT INTO departamento (deptoNome) VALUES ("Diretoria"); 
INSERT INTO departamento (deptoNome) VALUES ("Copa"); 

 
INSERT INTO combustivel (combTipo, combNome) VALUES ('A', "Alcool"); 
INSERT INTO combustivel (combTipo, combNome) VALUES ('D', "Diesel"); 
INSERT INTO combustivel (combTipo, combNome) VALUES ('F', "Flex"); 
INSERT INTO combustivel (combTipo, combNome) VALUES ('G', "Gasolina"); 

 
INSERT INTO clientes (clienteCPF, clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH, clienteCNHCat) VALUES (123456789, "João Silva", "Rua das Flores, 123", "(11) 98765-4321", "São Paulo", "1985-04-12", 12345678900, "B");
INSERT INTO clientes (clienteCPF, clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH, clienteCNHCat) VALUES (987654321, "Maria Oliveira", "Avenida Paulista, 456", "(11) 91234-5678", "São Paulo", "1990-08-22", 98765432101, "A"); 
INSERT INTO clientes (clienteCPF, clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH, clienteCNHCat) VALUES (111222333, "Pedro Santos", "Rua da Praia, 789", "(21) 98765-1234", "Rio de Janeiro", "1978-11-30", 11122233344, "AB"); 
INSERT INTO clientes (clienteCPF, clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH, clienteCNHCat) VALUES (444555666, "Ana Costa", "Rua dos Jacarandás, 101", "(31) 92345-6789", "Belo Horizonte", "1982-05-16", 44455566677, "B"); 
INSERT INTO clientes (clienteCPF, clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH, clienteCNHCat) VALUES (777888999, "Carlos Pereira", "Rua das Acácias, 202", "(61) 98765-4321", "Brasília", "1995-07-25", 77788899900, "C"); 
INSERT INTO clientes (clienteCPF, clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH, clienteCNHCat) VALUES (222333444, "Laura Mendes", "Avenida Brasil, 303", "(41) 91234-5678", "Curitiba", "1988-12-10", 22233344411, "B"); 
INSERT INTO clientes (clienteCPF, clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH, clienteCNHCat) VALUES (555666777, "Lucas Almeida", "Rua das Palmeiras, 404", "(21) 99876-5432", "Rio de Janeiro", "1993-03-05", 55566677722, "A"); 
INSERT INTO clientes (clienteCPF, clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH, clienteCNHCat) VALUES (888999000, "Fernanda Lima", "Rua das Orquídeas, 505", "(71) 98765-6789", "Salvador", "1987-09-17", 55566677722, " AB"); 
INSERT INTO clientes (clienteCPF, clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH, clienteCNHCat) VALUES (333444555, "Gustavo Rocha", "Avenida Sete, 606", "(11) 93456-7890", "São Paulo", "1980-01-20", 33344455544, "C"); 
INSERT INTO clientes (clienteCPF, clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH, clienteCNHCat) VALUES (666777888, "Juliana Campos", "Rua dos Girassóis, 707", "(31) 91567-8901", "Belo Horizonte", "1991-06-12", 66677788855, "B"); 


INSERT INTO funcionarios (funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo) VALUES (1001, 'Francisco de Oliveira', 1, '1800.00', '2001-11-20', 0, 'M', 1); 
INSERT INTO funcionarios (funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo) VALUES (1002, 'Ana Maria Andrade', 2, '3200.00', '1999-02-13', 1, 'F', 1); 
INSERT INTO funcionarios (funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo) VALUES (1003, 'Antônio Andrade de Oliveira', 3, '4800.00', '2007-11-05', 3, 'M', 1); 
INSERT INTO funcionarios (funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo) VALUES (1004, 'Maria Abelarda da Silva', 5, '937.00', '1997-03-01', 5, 'F', 1); 
INSERT INTO funcionarios (funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo) VALUES (1005, 'Manoel Trindade', 4, '7850.50', '1997-01-02', 3, 'M', 1); 
INSERT INTO funcionarios (funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo) VALUES (1006, 'Alexandre Barbosa', 1, '1800.00', '2000-06-08', 2, 'M', 1); 
INSERT INTO funcionarios (funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo) VALUES (1007, 'Rosana Campoy', 2, '3020.00', '2004-07-24', 3, 'F', 1); 
INSERT INTO funcionarios (funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo) VALUES (1008, 'Janaína Albuquerque', 3, '4500.00', '1999-03-25', 0, 'F', 1); 
INSERT INTO funcionarios (funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo) VALUES (1009, 'Roberto Silva Junior', 1, '1810.00', '2003-07-07', 0, 'M', 1); 
INSERT INTO funcionarios (funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo) VALUES (1010, 'Carlos Eduardo Siqueira', 4, '7890.00', '2009-08-04', 1, 'M', 1); 
INSERT INTO funcionarios (funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo) VALUES (1011, 'Heitor Sampaio', 1, '3450.00', '2011-03-05', 1, 'M', 1); 
INSERT INTO funcionarios (funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo) VALUES (1012, 'Célia Menezes', 1, '1980.00', '2008-07-18', 0, 'F', 1); 
INSERT INTO funcionarios (funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo) VALUES (1013, 'José Alves Costa', 1, '1650.00', '2000-09-11', 1, 'M', 1); 
INSERT INTO funcionarios (funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo) VALUES (1014, 'Arlinda Medeiros', 5, '937.00', '2000-05-03', 5, 'F', 1); 
INSERT INTO funcionarios (funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo) VALUES (1015, 'Josefina Sarmento', 4, '6789.00', '1997-01-02', 1, 'F', 1); 
INSERT INTO funcionarios (funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo) VALUES (1016, 'Wendell Navarro Perez', 3, '1212.00', '2004-04-15', 2, 'M', 1); 
INSERT INTO funcionarios (funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo) VALUES (1017, 'Rodolfo Rodrigues', 1, '8500.00', '2022-09-10', 2, 'M', 1); 



INSERT INTO veiculos (veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado) VALUES ('ABW4007', 'VW', 'Jetta', 'Preto', 2022, 'F', 3, 1); 
INSERT INTO veiculos (veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado) VALUES ('ACZ3243', 'VW', 'Fusca', 'Rosa', 1956, 'G', 4, 1); 
INSERT INTO veiculos (veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado) VALUES ('ADE3456', 'Chevrolet', 'Camaro', 'Amarelo', 2022, 'G', 4, 1); 
INSERT INTO veiculos (veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado) VALUES ('ADW2456', 'VW', 'Gol', 'Vermelho', 2021, 'A', 1, 1); 
INSERT INTO veiculos (veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado) VALUES ('ADX1473', 'Ford', 'Ka', 'Branco', 2021, 'A', 1, 1); 
INSERT INTO veiculos (veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado) VALUES ('AQW1234', 'Ford', 'Fusion', 'Preto', 2022, 'F', 3, 1); 
INSERT INTO veiculos (veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado) VALUES ('AQX3451', 'Porsche', 'Carrera', 'Preto', 2022, 'G', 4, 1); 
INSERT INTO veiculos (veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado) VALUES ('AQY2005', 'Chevrolet', 'S10', 'Branco', 2022, 'D', 2, 1); 
INSERT INTO veiculos (veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado) VALUES ('ASX3232', 'Ford', 'Ka', 'Marrom', 2022, 'F', 1, 1); 
INSERT INTO veiculos (veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado) VALUES ('AVX4003', 'VW', 'Amarok', 'Preto', 2022, 'D', 2, 1); 
INSERT INTO veiculos (veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado) VALUES ('AWQ3703', 'Chevrolet', 'Omega', 'Preto', 2022, 'G', 3, 1); 
INSERT INTO veiculos (veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado) VALUES ('AWS2365', 'Chevrolet', 'Cruze', 'Azul', 2022, 'F', 3, 1); 
INSERT INTO veiculos (veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado) VALUES ('AWV1234', 'Fiat', 'Palio', 'Branco', 2021, 'F', 1, 0); 
INSERT INTO veiculos (veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado) VALUES ('AWV1323', 'VW', 'Gol', 'Branco', 2022, 'F', 1, 0); 
INSERT INTO veiculos (veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado) VALUES ('AWY4546', 'Fiat', 'Fiorino', 'Branco', 2021, 'A', 2, 1); 
INSERT INTO veiculos (veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado) VALUES ('AZX3273', 'VW', 'Fox', 'Azul', 2021, 'F', 1, 1);  


INSERT INTO ordemdeservico (osNum, osFuncMat, osClienteID, osVeicPlaca, osDataRetirada, osDataDevolucao, osKMDevolucao, osStatus, osValorPgto) VALUES(1, 1001, 5, 'AWV1234', '2024-09-01', '2024-09-07', 1500, 1, 450.00);
INSERT INTO ordemdeservico (osNum, osFuncMat, osClienteID, osVeicPlaca, osDataRetirada, osDataDevolucao, osKMDevolucao, osStatus, osValorPgto) VALUES(2, 1002, 6, 'AWY4546', '2024-09-02', '2024-09-08', 1600, 1, 500.00);
INSERT INTO ordemdeservico (osNum, osFuncMat, osClienteID, osVeicPlaca, osDataRetirada, osDataDevolucao, osKMDevolucao, osStatus, osValorPgto) VALUES(3, 1003, 1, 'AVX4003', '2024-09-03', '2024-09-09', 1700, 0, 550.00);
INSERT INTO ordemdeservico (osNum, osFuncMat, osClienteID, osVeicPlaca, osDataRetirada, osDataDevolucao, osKMDevolucao, osStatus, osValorPgto) VALUES(4, 1004, 6, 'ASX3232', '2024-09-04', '2024-09-10', 1800, 1, 600.00); 
INSERT INTO ordemdeservico (osNum, osFuncMat, osClienteID, osVeicPlaca, osDataRetirada, osDataDevolucao, osKMDevolucao, osStatus, osValorPgto) VALUES(5, 1005, 6, 'AWV1323', '2024-09-05', '2024-09-11', 1900, 1, 650.00); 
INSERT INTO ordemdeservico (osNum, osFuncMat, osClienteID, osVeicPlaca, osDataRetirada, osDataDevolucao, osKMDevolucao, osStatus, osValorPgto) VALUES(6, 1006, 1, 'AVX4003', '2024-09-06', '2024-09-12', 2000, 1, 700.00); 
INSERT INTO ordemdeservico (osNum, osFuncMat, osClienteID, osVeicPlaca, osDataRetirada, osDataDevolucao, osKMDevolucao, osStatus, osValorPgto) VALUES(7, 1007, 5, 'AZX3273', '2024-09-07', '2024-09-13', 2100, 1, 750.00); 
INSERT INTO ordemdeservico (osNum, osFuncMat, osClienteID, osVeicPlaca, osDataRetirada, osDataDevolucao, osKMDevolucao, osStatus, osValorPgto) VALUES(8, 1008, 5, 'AWS2365', '2024-09-08', '2024-09-14', 2200, 0, 800.00); 
INSERT INTO ordemdeservico (osNum, osFuncMat, osClienteID, osVeicPlaca, osDataRetirada, osDataDevolucao, osKMDevolucao, osStatus, osValorPgto) VALUES(9, 1009, 6, 'ASX3232', '2024-09-09', '2024-09-15', 2300, 0, 850.00); 
INSERT INTO ordemdeservico (osNum, osFuncMat, osClienteID, osVeicPlaca, osDataRetirada, osDataDevolucao, osKMDevolucao, osStatus, osValorPgto) VALUES(10, 1010, 1, 'AWV1234', '2024-09-10', '2024-09-16', 2400, 1, 900.00);

