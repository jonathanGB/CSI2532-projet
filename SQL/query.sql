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

Select SSN,Patient.nom,Patient.prenom,phoneNoP,Patient.adresse,gender,dateNaissance
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
From Patient, PatologiePatient
Where (PatologiePatient.nomp = 'Rhume' AND PatologiePatient.nomp != 'Grippe') AND PatologiePatient.SSN = Patient.SSN;

/**************************************************************
6 - Quels sont les médecins qui ont traité les pathologies « rhume » et « grippe » ?
**************************************************************/

Select Medecin.*
From Patient, PatologiePatient, Medecin
Where (PatologiePatient.nomp = 'rhume' OR PatologiePatient.nomp != 'Grippe') AND PatologiePatient.SSN = Patient.SSN AND Patient.medecinID = Medecin.medecinID;


/**************************************************************
7 - Quel est le nombre de patients qui ont été traités par le médecin « tremblay » et qui ont la pathologie « Cancer du foie » ?
**************************************************************/

Select Count(Patient.SSN)
From Patient, Medecin, PatologiePatient
Where Medecin.nom = 'Tremblay' AND Medecin.medecinID = Patient.medecinID AND PatologiePatient.SSN = PatologiePatient.SSN AND PatologiePatient.nomp = 'Cancer du foie';



/**************************************************************
8 - Quel est le nombre de patients qui ont été traités par le médecin « tremblay » et qui n’ont pas
la pathologie « Cancer du foie » ?
**************************************************************/

Select Count(Patient.SSN)
From Patient, Medecin, PatologiePatient
Where Medecin.nom = 'Tremblay' AND Medecin.medecinID = Patient.medecinID AND PatologiePatient.SSN = PatologiePatient.SSN AND PatologiePatient.nomP != 'Cancer du foie';



/**************************************************************
9 - Quel est le nombre de patients par médecin dans le cabinet médical ? affichez l’ID, le nom du médecin et le nombre de patients.
**************************************************************/

Select Medecin.medecinID, Medecin.nom ,Count(Patient.SSN)
From Patient, Medecin
Where Medecin.medecinID = Patient.medecinID
Group by Medecin.nom,Medecin.medecinID;

/**************************************************************
10 - Quel est le nombre de patients par médecin dans le cabinet médical qui ont été traités pour la
pathologie « Cancer » ? affichez l’ID du médecin et le nombre de patients.
**************************************************************/

Select Medecin.medecinID, Count(Patient.SSN)
from Patient, Medecin, PatologiePatient
Where PatologiePatient.nomp = 'Cancer' AND PatologiePatient.SSN = PatologiePatient.SSN AND Medecin.medecinID = Patient.medecinID
Group by Medecin.medecinID;



/**************************************************************
11 - Quels sont les médicaments du patient P001 qui sont contre-indiqués avec la nouvelle
prescription du médicament M003 ?
**************************************************************/
