-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 03-Jul-2024 às 22:16
-- Versão do servidor: 10.4.32-MariaDB
-- versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `database_development`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `local` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `addresses`
--

INSERT INTO `addresses` (`id`, `local`, `createdAt`, `updatedAt`) VALUES
(40, 'Argentina', '2024-07-03 13:19:30', '2024-07-03 13:19:30'),
(41, 'Nordeste', '2024-07-03 13:19:30', '2024-07-03 13:19:30'),
(42, 'Amazônia', '2024-07-03 13:19:30', '2024-07-03 13:19:30');

-- --------------------------------------------------------

--
-- Estrutura da tabela `cargas`
--

CREATE TABLE `cargas` (
  `id` int(11) NOT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `cargas`
--

INSERT INTO `cargas` (`id`, `tipo`, `createdAt`, `updatedAt`) VALUES
(13, 'Eletrônicos', '2024-07-02 23:30:25', '2024-07-02 23:30:25'),
(14, 'Combustível', '2024-07-02 23:30:25', '2024-07-02 23:30:25'),
(15, 'Comida', '2024-07-02 23:30:25', '2024-07-02 23:30:25'),
(19, 'Eletrônicos', '2024-07-03 13:19:30', '2024-07-03 13:19:30'),
(20, 'Combustível', '2024-07-03 13:19:30', '2024-07-03 13:19:30'),
(21, 'Comida', '2024-07-03 13:19:30', '2024-07-03 13:19:30');

-- --------------------------------------------------------

--
-- Estrutura da tabela `deliveries`
--

CREATE TABLE `deliveries` (
  `id` int(11) NOT NULL,
  `truckId` int(11) NOT NULL,
  `driverId` varchar(255) NOT NULL,
  `cargoType` varchar(255) NOT NULL,
  `value` float NOT NULL,
  `destination` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `hasInsurance` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `deliveries`
--

INSERT INTO `deliveries` (`id`, `truckId`, `driverId`, `cargoType`, `value`, `destination`, `status`, `hasInsurance`, `createdAt`, `updatedAt`) VALUES
(8, 59, '8', 'Combustível', 384.16, 'Argentina', 'Concluído', 0, '2024-07-03 16:57:22', '2024-07-03 17:30:01'),
(12, 61, '8', 'Combustível', 1.44, 'Nordeste', 'Concluído', 1, '2024-07-03 17:11:24', '2024-07-03 19:25:27'),
(14, 60, '9', 'Combustível', 1054.14, 'Argentina', 'Concluído', 0, '2024-07-03 19:25:03', '2024-07-03 20:01:08'),
(15, 61, '9', 'Combustível', 1.728, 'Nordeste', 'Pendente', 1, '2024-07-03 19:25:56', '2024-07-03 19:25:56');

-- --------------------------------------------------------

--
-- Estrutura da tabela `destinos`
--

CREATE TABLE `destinos` (
  `id` int(11) NOT NULL,
  `local` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `drivers`
--

CREATE TABLE `drivers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `truckId` int(11) DEFAULT NULL,
  `deliveriesCompleted` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `drivers`
--

INSERT INTO `drivers` (`id`, `name`, `truckId`, `deliveriesCompleted`, `status`, `createdAt`, `updatedAt`) VALUES
(8, 'Driver A', 1, 18, 'Disponível', '2024-07-03 13:19:30', '2024-07-03 19:25:27'),
(9, 'Driver B', 2, 5, 'Disponível', '2024-07-03 13:19:30', '2024-07-03 20:01:08');

-- --------------------------------------------------------

--
-- Estrutura da tabela `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240701214504-create-truck.js'),
('20240701214506-create-delivery.js'),
('20240701214509-create-driver.js'),
('20240701214511-create-user.js'),
('20240702143345-add-hasInsurance-to-deliveries.js'),
('20240702171948-create-destinos.js'),
('20240702173024-create-address.js'),
('20240702174155-create-address.js'),
('20240702200843-create-carga.js'),
('20240702232948-create-carga.js'),
('20240703171948-create-destinos.js'),
('20240703174155-create-address.js'),
('20240703214504-create-truck.js'),
('20240703214506-create-delivery.js'),
('20240703214507-create-delivery.js'),
('20240703214508-create-delivery.js'),
('20240703214509-create-driver.js'),
('20240703214510-create-delivery.js'),
('20240703214510-create-driver.js'),
('20240703214511-create-delivery.js'),
('20240703214511-create-user.js'),
('20240703214515-create-delivery.js'),
('20240703232948-create-carga.js');

-- --------------------------------------------------------

--
-- Estrutura da tabela `trucks`
--

CREATE TABLE `trucks` (
  `id` int(11) NOT NULL,
  `model` varchar(255) DEFAULT NULL,
  `plate` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `trucks`
--

INSERT INTO `trucks` (`id`, `model`, `plate`, `status`, `createdAt`, `updatedAt`) VALUES
(59, 'Model A', 'ABC-1234', 'Disponível', '2024-07-03 13:19:30', '2024-07-03 19:25:45'),
(60, 'Model B', 'XYZ-5678', 'Disponível', '2024-07-03 13:19:30', '2024-07-03 20:01:08'),
(61, 'Model C', 'a', 'Indisponível', '2024-07-03 13:28:57', '2024-07-03 19:25:56');

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `name`, `role`, `createdAt`, `updatedAt`) VALUES
(45, 'Admin', 'admin', '2024-07-03 13:19:30', '2024-07-03 13:19:30'),
(46, 'User', 'read', '2024-07-03 13:19:30', '2024-07-03 13:19:30'),
(47, '2', NULL, '2024-07-03 16:59:16', '2024-07-03 16:59:16');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `local` (`local`);

--
-- Índices para tabela `cargas`
--
ALTER TABLE `cargas`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `deliveries`
--
ALTER TABLE `deliveries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `truckId` (`truckId`);

--
-- Índices para tabela `destinos`
--
ALTER TABLE `destinos`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Índices para tabela `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Índices para tabela `trucks`
--
ALTER TABLE `trucks`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de tabela `cargas`
--
ALTER TABLE `cargas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de tabela `deliveries`
--
ALTER TABLE `deliveries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `destinos`
--
ALTER TABLE `destinos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `drivers`
--
ALTER TABLE `drivers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `trucks`
--
ALTER TABLE `trucks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `deliveries`
--
ALTER TABLE `deliveries`
  ADD CONSTRAINT `deliveries_ibfk_1` FOREIGN KEY (`truckId`) REFERENCES `trucks` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
