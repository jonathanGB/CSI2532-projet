SET search_path = HopitalDB;
DROP SCHEMA IF EXISTS HopitalDB CASCADE;
CREATE SCHEMA HopitalDB;


-- DROP DOMAIN IF EXISTS HopitalDB.sex;
-- DROP TABLE IF EXISTS HopitalDB.Medecin;
-- DROP TABLE IF EXISTS HopitalDB.Secretaire;
-- DROP TABLE IF EXISTS HopitalDB.Patient;
-- DROP TABLE IF EXISTS HopitalDB.Consultation;
-- DROP TABLE IF EXISTS HopitalDB.PrescriptionES;
-- DROP TABLE IF EXISTS HopitalDB.PrescriptionM;
-- DROP TABLE IF EXISTS HopitalDB.Patologie;
-- DROP TABLE IF EXISTS HopitalDB.PatologieP;
-- DROP TABLE IF EXISTS HopitalDB.Medicament;
-- DROP TABLE IF EXISTS HopitalDB.Substance;

CREATE TABLE IF NOT EXISTS HopitalDB.Secretaire(
	phoneNoS 	VARCHAR		NOT NULL,
	nom		VARCHAR		NOT NULL,
	prenom		VARCHAR		NOT NULL,
	adresse 	VARCHAR		NOT NULL,
	PRIMARY KEY (phoneNoS));



CREATE TABLE IF NOT EXISTS  HopitalDB.Medecin(
	medecinID	VARCHAR(4)		UNIQUE NOT NULL,
	phoneNoM	VARCHAR			NOT NULL,
	nom		VARCHAR			NOT NULL,
	prenom		VARCHAR			NOT NULL,
	adresse		VARCHAR			NOT NULL,
	phoneNoS	VARCHAR			NOT NULL,
	specialite	VARCHAR			NOT NULL,
	PRIMARY KEY (medecinID),
	FOREIGN KEY (phoneNoS) REFERENCES HopitalDB.Secretaire(phoneNoS) ON DELETE RESTRICT ON UPDATE CASCADE);



CREATE DOMAIN HopitalDB.sex AS CHAR
	CHECK (VALUE IN ('M', 'F'));



CREATE TABLE IF NOT EXISTS HopitalDB.Patient(
	SSN		VARCHAR(10)		NOT NULL,
	phoneNoP	VARCHAR			NOT NULL,
	medecinID	VARCHAR(4)		NOT NULL,
	nom 		VARCHAR			NOT NULL,
	prenom 		VARCHAR			NOT NULL,
	adresse		VARCHAR			NOT NULL,
	gender		sex			DEFAULT 'M',
	dateNaissance	VARCHAR(10)		NOT NULL,
	PRIMARY KEY (SSN),
	FOREIGN KEY (medecinID) REFERENCES HopitalDB.Medecin(medecinID) ON DELETE RESTRICT ON UPDATE CASCADE);


CREATE TABLE IF NOT EXISTS HopitalDB.Consultation(
	medecinID	VARCHAR(4)		NOT NULL,
	phoneNoS	VARCHAR			NOT NULL,
	SSN		VARCHAR(10)		NOT NULL,
	objet		VARCHAR			NOT NULL,
	dateC		VARCHAR(20)		NOT NULL,
	heureDebut	VARCHAR(10)		NOT NULL,
	PRIMARY KEY (SSN, heureDebut, dateC),
	FOREIGN KEY (medecinID) REFERENCES HopitalDB.Medecin(medecinID) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (phoneNoS) REFERENCES HopitalDB.Secretaire(phoneNoS) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (SSN) REFERENCES HopitalDB.Patient(SSN) ON DELETE RESTRICT ON UPDATE CASCADE);


CREATE TABLE IF NOT EXISTS HopitalDB.PrescriptionES(
	prescriptionESID	SERIAL PRIMARY KEY,
	SSN			VARCHAR(10)		NOT NULL,
	heureDebut		VARCHAR(10)		NOT NULL,
	dateC			VARCHAR(10)		NOT NULL,
	nomExam			VARCHAR(30)		NOT NULL,
	FOREIGN KEY (SSN, heureDebut, dateC) REFERENCES HopitalDB.Consultation(SSN, heureDebut, dateC) ON DELETE RESTRICT ON UPDATE CASCADE);


CREATE TABLE IF NOT EXISTS HopitalDB.PrescriptionM(
	prescritionMID	VARCHAR(10)		NOT NULL,
	SSN		VARCHAR(10)		NOT NULL,
	heureDebut	VARCHAR(10)		NOT NULL,
	dateC		VARCHAR(10)		NOT NULL,
	nom		VARCHAR(20)		NOT NULL,
	dureeValidite	INTEGER			NOT NULL,
	FOREIGN KEY (SSN, heureDebut, dateC) REFERENCES HopitalDB.Consultation(SSN, heureDebut, dateC) ON DELETE CASCADE ON UPDATE CASCADE);



CREATE TABLE IF NOT EXISTS HopitalDB.Patologie(
	nomP		VARCHAR(20)		NOT NULL,
	PRIMARY KEY (nomP));



CREATE TABLE IF NOT EXISTS HopitalDB.PatologiePatient(
	SSN		VARCHAR(10)		NOT NULL,
	nomP		VARCHAR(20)		NOT NULL,
	dateDebut	VARCHAR(10)		NOT NULL,
	datefin		VARCHAR(10)		NOT NULL,
	FOREIGN KEY (SSN) REFERENCES HopitalDB.Patient(SSN) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (nomP) REFERENCES HopitalDB.PATOLOGIE(nomP) ON DELETE RESTRICT ON UPDATE CASCADE);


CREATE TABLE IF NOT EXISTS HopitalDB.SubstanceActive(
	nomS		VARCHAR(20)		NOT NULL,
	PRIMARY KEY (nomS));


CREATE TABLE IF NOT EXISTS HopitalDB.Medicament(
	nomM		VARCHAR(20)		NOT NULL,
	nomS		VARCHAR(20)		NOT NULL,
	prix		FLOAT			NOT NULL,
	isGenerique	BOOLEAN			DEFAULT TRUE,
	PRIMARY KEY (nomM),
	FOREIGN KEY (nomS) REFERENCES HopitalDB.SubstanceActive(nomS));
