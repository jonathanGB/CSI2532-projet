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

		
	



