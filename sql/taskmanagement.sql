-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 25 Lis 2018, 11:04
-- Wersja serwera: 10.1.28-MariaDB
-- Wersja PHP: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `taskmanagement`
--
CREATE DATABASE IF NOT EXISTS `taskmanagement` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `taskmanagement`;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `categories`
--

CREATE TABLE `categories` (
  `idcat` int(11) NOT NULL,
  `category` varchar(25) COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `subcategories`
--

CREATE TABLE `subcategories` (
  `idsubcat` int(11) NOT NULL,
  `subcategory` varchar(25) COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `subtasks`
--

CREATE TABLE `subtasks` (
  `idsubtask` int(11) NOT NULL,
  `subtask` varchar(120) COLLATE utf8_polish_ci NOT NULL,
  `date_subtask` date DEFAULT NULL,
  `Uwagi` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `idtask` int(11) NOT NULL,
  `enddate_subtask` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `tasks`
--

CREATE TABLE `tasks` (
  `idtask` int(11) NOT NULL,
  `task` varchar(250) COLLATE utf8_polish_ci NOT NULL,
  `begindate` date DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  `priority` varchar(25) COLLATE utf8_polish_ci DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `subcategory` int(11) DEFAULT NULL,
  `repeated` tinyint(1) DEFAULT '0' COMMENT 'tak, nie',
  `period` int(5) DEFAULT NULL COMMENT 'co ile dni',
  `alarm` tinyint(1) DEFAULT '0' COMMENT 'tak, nie',
  `beforetime` int(2) DEFAULT NULL COMMENT 'ile dni przed term.',
  `subtasks` int(11) DEFAULT NULL,
  `step` varchar(30) COLLATE utf8_polish_ci DEFAULT NULL,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'do testowania'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`idcat`);

--
-- Indexes for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`idsubcat`);

--
-- Indexes for table `subtasks`
--
ALTER TABLE `subtasks`
  ADD PRIMARY KEY (`idsubtask`),
  ADD KEY `idtask` (`idtask`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`idtask`),
  ADD KEY `zadania_ibfk_1` (`category`),
  ADD KEY `zadania_ibfk_2` (`subcategory`),
  ADD KEY `zadania_ibfk_3` (`subtasks`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `categories`
--
ALTER TABLE `categories`
  MODIFY `idcat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `idsubcat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `subtasks`
--
ALTER TABLE `subtasks`
  MODIFY `idsubtask` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT dla tabeli `tasks`
--
ALTER TABLE `tasks`
  MODIFY `idtask` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `subtasks`
--
ALTER TABLE `subtasks`
  ADD CONSTRAINT `subtasks_ibfk_1` FOREIGN KEY (`idtask`) REFERENCES `tasks` (`idtask`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`category`) REFERENCES `categories` (`idcat`),
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`subcategory`) REFERENCES `subcategories` (`idsubcat`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
