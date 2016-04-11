SET search_path = HopitalDB;

/************************************************************** 
1 - Quels sont les médecins du cabinet médical ordonnés par noms en ordre croissant
**************************************************************/

SELECT *
FROM Medecin
ORDER BY nom;


/**************************************************************
2 - Quels sont les patients du médecin dont l’ID est M001 ? Affichez toutes les informations de
ces patients
**************************************************************/

SELECT *
FROM Patient
WHERE medecinID = 'M001';


/**************************************************************
3 - Quels sont les patients des médecins dont le nom contient « blay » ? Affichez toutes les
informations de ces patients
**************************************************************/

SELECT *
FROM Patient
WHERE medecinID IN (SELECT medecinID
		FROM Medecin
		WHERE nom LIKE '%blay%' OR nom LIKE '%Blay%');


/**************************************************************
4 - Quels sont les patients du médecin Tremblay et ceux du médecin Solo ?
**************************************************************/

SELECT *
FROM Patient
WHERE medecinID IN (SELECT medecinID
	FROM Medecin
	WHERE nom = 'Tremblay' OR nom = 'Solo');


/******************************************************************************
5 - Quels sont les patients qui ont eu la pathologie « rhume » mais pas la pathologie « grippe » ?
**********************************************************************************************/

SELECT *
FROM Patient 
WHERE SSN IN (SELECT SSN
		FROM PathologiePatient
		WHERE nomP = 'Rhume')
	AND SSN NOT IN (SELECT SSN
		FROM PathologiePatient
		WHERE nomP = 'Grippe');


/**************************************************************
6 - Quels sont les médecins qui ont traité les pathologies « rhume » et « grippe » ?
**************************************************************/

SELECT * FROM Medecin WHERE medecinID IN
	(SELECT medecinID FROM Patient WHERE SSN IN
		(SELECT SSN FROM PathologiePatient WHERE nomP = 'Rhume')
		AND SSN IN (SELECT SSN FROM PathologiePatient WHERE nomP = 'Grippe'));


/**************************************************************
7 - Quel est le nombre de patients qui ont été traités par le médecin « Tremblay » et qui ont la pathologie « Cancer du foie » ?
**************************************************************/

SELECT COUNT(SSN) FROM Patient WHERE medecinID IN
	(SELECT medecinID FROM Medecin WHERE nom = 'Tremblay')
	AND SSN IN (SELECT SSN FROM PathologiePatient WHERE nomP = 'Cancer du foie');


/**************************************************************
8 - Quel est le nombre de patients qui ont été traités par le médecin « Tremblay » et qui n’ont pas
la pathologie « Cancer du foie » ?
**************************************************************/

SELECT COUNT(SSN) FROM Patient WHERE medecinID IN
	(SELECT medecinID FROM Medecin WHERE nom = 'Tremblay')
	AND SSN NOT IN (SELECT SSN FROM PathologiePatient WHERE nomP = 'Cancer du foie');


/**************************************************************
9 - Quel est le nombre de patients par médecin dans le cabinet médical ? Affichez l’ID, le nom du médecin et le nombre de patients.
**************************************************************/

SELECT Medecin.medecinID, Medecin.nom, COUNT(Patient.SSN)
FROM Patient, Medecin
WHERE Medecin.medecinID = Patient.medecinID
GROUP BY Medecin.nom, Medecin.medecinID;


/**************************************************************
10 - Quel est le nombre de patients par médecin dans le cabinet médical qui ont été traités pour la
pathologie « Cancer » ? affichez l’ID du médecin et le nombre de patients.
**************************************************************/

SELECT Medecin.medecinID, COUNT(Patient.SSN)
FROM Patient, Medecin
WHERE Medecin.medecinID = Patient.medecinID
	AND Patient.SSN IN (SELECT SSN
					FROM PathologiePatient
					WHERE nomP LIKE '%Cancer%')
GROUP BY Medecin.medecinID;


/**************************************************************
11 - Quels sont les médicaments du patient P001 qui sont contre-indiqués avec la nouvelle
prescription du médicament M003 ?
**************************************************************/

SELECT * FROM Medicament WHERE nomM IN
	(SELECT nom FROM PrescriptionM WHERE SSN = 'P001') AND
	(nomS IN (SELECT nomS1 FROM ContreIndicationSubSub WHERE nomS2 IN (SELECT nomS FROM Medicament WHERE nomM = 'M003'))
	OR (nomS IN (SELECT nomS2 FROM ContreIndicationSubSub WHERE nomS1 IN (SELECT nomS FROM Medicament WHERE nomM = 'M003'))));


/**************************************************************
12. Lister la liste des substances actives ainsi que pour chaque substance, les substances incompatibles si elles existent (sinon affichez null)
**************************************************************/

SELECT nomS AS Substance, nomS1 AS Incompatible
FROM SubstanceActive LEFT OUTER JOIN ContreIndicationSubSub ON (SubstanceActive.nomS = ContreIndicationSubSub.nomS2);
-- Pour que ça marche il faut entrer les contre-indications dans les deux sens dans la BDD, sinon ça n'affiche qu'une contre-indication sur deux.
-- Je n'ai pas trouvé de solution plus élégante mais si vous avez des idées...

/**************************************************************
13. Créez un trigger qui rejette l’insertion dans une nouvelle prescription d’un médicament contre-indiqué pour un patient donné
**************************************************************/

CREATE TRIGGER contreindication
AFTER INSERT OR UPDATE ON PrescriptionM
FOR EACH ROW
WHEN NEW.nom IN (SELECT nomM
			FROM Medicament
			WHERE (nomS IN (SELECT nomS1 FROM ContreIndicationSubSub WHERE nomS2 IN (SELECT nomS FROM Medicament WHERE nomM IN (SELECT nom FROM PrescriptionM WHERE SSN = NEW.SSN)))
			OR (nomS IN (SELECT nomS2 FROM ContreIndicationSubSub WHERE nomS1 IN (SELECT nomS FROM Medicament WHERE nomM IN (SELECT nom FROM PrescriptionM WHERE SSN = NEW.SSN))))
			OR (nomS IN (SELECT nomS FROM ContreIndicationSubPatho WHERE nomP IN (SELECT nomP FROM PathologiePatient WHERE SSN = NEW.SSN)))
			OR (nomM IN (SELECT nomM FROM ContreIndicationMediPatho WHERE nomP IN (SELECT nomP FROM PathologiePatient WHERE SSN = NEW.SSN)))));
BEGIN
RAISERROR('Ce médicament est contre-indiqué pour ce patient.')
ROLLBACK TRANSACTION
END;


/**************************************************************
14. Supprimez le médecin « Johan Bos ».
**************************************************************/

DELETE FROM Medecin WHERE nom = 'Bos' AND prenom = 'Johan';


/**************************************************************
15. Modifiez l’adresse du patient « Manuel Valls »
**************************************************************/

UPDATE HopitalDB.Patient SET adresse = 'Elysee, Paris, France' WHERE nom = 'Valls' AND prenom = 'Manuel';

