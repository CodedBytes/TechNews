-- MySQL Script generated by MySQL Workbench
-- Sat Sep 16 13:44:51 2023
-- Model: Modelagem    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema news
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema news
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `news` DEFAULT CHARACTER SET utf8mb4 ;
USE `news` ;

-- -----------------------------------------------------
-- Table `news`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `news`.`usuarios` (
  `user_ID` INT NOT NULL AUTO_INCREMENT,
  `Usuario` VARCHAR(45) NOT NULL,
  `Senha` VARCHAR(300) NOT NULL,
  `Data` DATETIME NOT NULL,
  `Nivel` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `news`.`noticias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `news`.`noticias` (
  `notice_ID` INT NOT NULL AUTO_INCREMENT,
  `user_ID` INT NOT NULL,
  `Autor` VARCHAR(45) NOT NULL,
  `Titulo` VARCHAR(45) NOT NULL,
  `subTitulo` VARCHAR(65) NOT NULL,
  `Texto` VARCHAR(5000) NOT NULL,
  `Data_Criacao` VARCHAR(30) NOT NULL DEFAULT '00/00/000',
  `Foto` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`notice_ID`, `user_ID`),
  INDEX `fk_noticias_usuarios_idx` (`user_ID` ASC ) ,
  CONSTRAINT `fk_noticias_usuarios`
    FOREIGN KEY (`user_ID`)
    REFERENCES `news`.`usuarios` (`user_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
