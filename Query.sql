SET search_path = HopitalDB;

/************************************************************** 
1 - Quels sont les médecins du cabinet médical ordonnés par noms en ordre croissant
**************************************************************/

Select *
From Medecin
Order by nom;



/**************************************************************
2 - Quels sont les patients du médecin dont l’ID est M001 ? Affichez toutes les informations de
ces patients
**************************************************************/

Select Patient.*
From Patient,Medecin
Where Medecin.medecinID = 'M001' AND Medecin.medecinID = Patient.medecinID;



/**************************************************************
3 - Quels sont les patients des médecins dont le nom contient « blay » ? Affichez toutes les
informations de ces patients
**************************************************************/

Select Patient.*
From Patient,Medecin
Where Medecin.nom LIKE '%blay%' AND Medecin.medecinID = Patient.medecinID;



/**************************************************************
4 - Quels sont les patients du médecin Tremblay et ceux du médecin Solo ?
**************************************************************/

Select Patient.*
From Patient, Medecin 
Where (Medecin.nom = 'Tremblay' OR Medecin.nom = 'Solo') AND Medecin.medecinID = Patient.medecinID;



/******************************************************************************
5 - Quels sont les patients qui ont eu la pathologie « rhume » mais pas la pathologie « grippe » ?
**********************************************************************************************/

Select Patient.*
From Patient, PathologiePatient 
Where (PathologiePatient.nomp = 'Rhume' AND PathologiePatient.nomp != 'Grippe') AND PathologiePatient.SSN = Patient.SSN;



/**************************************************************
6 - Quels sont les médecins qui ont traité les pathologies « rhume » et « grippe » ?
**************************************************************/

Select Medecin.*
From Patient, PathologiePatient, Medecin 
Where (pathologiePatient.nomp = 'Rhume' OR PathologiePatient.nomp = 'Grippe') AND PathologiePatient.SSN = Patient.SSN AND Patient.medecinID = Medecin.medecinID;


/**************************************************************
7 - Quel est le nombre de patients qui ont été traités par le médecin « tremblay » et qui ont la pathologie « Cancer du foie » ?
**************************************************************/

Select COUNT(Patient.SSN)
From Patient, Medecin, PathologiePatient
Where (Medecin.nom = 'Tremblay' AND Medecin.medecinID = Patient.medecinID) AND (PathologiePatient.SSN = Patient.SSN AND PathologiePatient.nomp = 'Cancer du foie');



/**************************************************************
8 - Quel est le nombre de patients qui ont été traités par le médecin « tremblay » et qui n’ont pas
la pathologie « Cancer du foie » ?
**************************************************************/

Select Count(Patient.SSN)
From Patient, Medecin, PathologiePatient
Where (Medecin.nom = 'Tremblay' AND Medecin.medecinID = Patient.medecinID) AND (PathologiePatient.SSN = Patient.SSN AND PathologiePatient.nomP != 'Cancer du foie');



/**************************************************************
9 - Quel est le nombre de patients par médecin dans le cabinet médical ? affichez l’ID, le nom du médecin et le nombre de patients.
**************************************************************/

Select Medecin.medecinID, Medecin.prenom ,Medecin.nom ,Count(Patient.SSN)
From Patient, Medecin
Where Medecin.medecinID = Patient.medecinID
Group by Medecin.nom,Medecin.medecinID;



/**************************************************************
10 - Quel est le nombre de patients par médecin dans le cabinet médical qui ont été traités pour la
pathologie « Cancer » ? affichez l’ID du médecin et le nombre de patients.
**************************************************************/

Select Medecin.medecinID, Count(Patient.SSN)
From Patient, Medecin, PathologiePatient
Where (PathologiePatient.nomp LIKE '%Cancer' AND PathologiePatient.SSN = Patient.SSN) AND Medecin.medecinID = Patient.medecinID
Group by Medecin.medecinID;



/**************************************************************
11 - Quels sont les médicaments du patient P001 qui sont contre-indiqués avec la nouvelle*
prescription du médicament M003 ?
**************************************************************/

SELECT * FROM Medicament WHERE nomM IN
	(SELECT nom FROM PrescriptionM WHERE SSN = 'P001') AND
	(nomS IN (SELECT nomS1 FROM ContreIndicationSubSub WHERE nomS2 IN (SELECT nomS FROM Medicament WHERE nomM = 'M003'))
	OR (nomS IN (SELECT nomS2 FROM ContreIndicationSubSub WHERE nomS1 IN (SELECT nomS FROM Medicament WHERE nomM = 'M003'))));



/**************************************************************
12. Lister la liste des substances actives ainsi que pour chaque substance, les substances incompatibles si elles existent (sinon affichez null)*
**************************************************************/

SELECT nomS AS Substance, nomS1 AS Incompatible
FROM SubstanceActive LEFT OUTER JOIN ContreIndicationSubSub ON (SubstanceActive.nomS = ContreIndicationSubSub.nomS2);



/**************************************************************
13. Créez un trigger qui rejette l’insertion dans une nouvelle prescription d’un médicament contre-indiqué pour un patient donné
**************************************************************/

CREATE OR REPLACE FUNCTION contrindic() RETURNS trigger AS $emp_stamp$
	BEGIN
		IF NEW.nom IN (SELECT nomM FROM Medicament WHERE
			(nomS IN (SELECT nomS1 FROM ContreIndicationSubSub WHERE nomS2 IN (SELECT nomS FROM Medicament WHERE nomM IN (SELECT nom FROM PrescriptionM WHERE SSN = NEW.SSN)))
			OR (nomS IN (SELECT nomS2 FROM ContreIndicationSubSub WHERE nomS1 IN (SELECT nomS FROM Medicament WHERE nomM IN (SELECT nom FROM PrescriptionM WHERE SSN = NEW.SSN))))
			OR (nomS IN (SELECT nomS FROM ContreIndicationSubPatho WHERE nomP IN (SELECT nomP FROM PathologiePatient WHERE SSN = NEW.SSN)))
			OR (nomM IN (SELECT nomM FROM ContreIndicationMediPatho WHERE nomP IN (SELECT nomP FROM PathologiePatient WHERE SSN = NEW.SSN))))) THEN
			RAISE EXCEPTION 'Ce médicament est contre-indiqué pour ce patient.';
			ELSE RETURN NEW;
			END IF;
	END;
$emp_stamp$ LANGUAGE plpgsql;

CREATE TRIGGER contreindication
BEFORE INSERT OR UPDATE ON PrescriptionM
FOR EACH ROW
EXECUTE PROCEDURE contrindic();


/**************************************************************
14. Supprimez le médecin « Johan Bos ».
**************************************************************/
DELETE FROM Medecin WHERE nom = 'Bos' AND prenom = 'Johan';

/**************************************************************
15. Modifiez l’adresse du patient « Manuel Valls »
**************************************************************/
UPDATE HopitalDB.Patient set adresse = 'Elisee, Paris, France' where nom='Valls' and prenom='Manuel';

