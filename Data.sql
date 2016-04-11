/**************************************************************
Insertion de Donnees
**************************************************************/
INSERT INTO HopitalDB.Secretaire VALUES ('222-111-1111','LeBoeuf','Victoria','355 Golden Road, Kingston, Hello World');
INSERT INTO HopitalDB.Secretaire VALUES ('333-111-1111','Dupont','Vanessa','125 Rose-Marie Road, Kingston, Hello World');

INSERT INTO HopitalDB.Medecin VALUES ('M000','PhoneNoM','Nom','Prenom','Adresse','222-111-1111','Specialite');
INSERT INTO HopitalDB.Medecin VALUES ('M001','001-111-1111','Tremblay','Victor','35 Silver Road, Kingston, Hello World','222-111-1111','Pediatrie');
INSERT INTO HopitalDB.Medecin VALUES ('M002','002-111-1111','Solo','Elliot','15 Silver Road, Kingston, Hello World','222-111-1111','Medecine generale');
INSERT INTO HopitalDB.Medecin VALUES ('M003','003-111-1111','Bos','Johan','255 Silver Road, Kingston, Hello World','333-111-1111','Pneumonologie');

INSERT INTO HopitalDB.Patient VALUES ('P001','100-111-1111','M003','De la Serre','Elise','1225 Duchesse Road, Kingston, Hello World','F','22.02.1900');
INSERT INTO HopitalDB.Patient VALUES ('P002','200-111-1111','M003','Deschamps','Elena','145 Duchesse Road, Kingston, Hello World','F','02.12.1910');
INSERT INTO HopitalDB.Patient VALUES ('P003','300-111-1111','M001','Valls','ManueL','1145 Duchesse Road, Kingston, Hello World','M','23.03.1956');
INSERT INTO HopitalDB.Patient VALUES ('P004','400-111-1111','M002','Zakaria','Abdullah','14 Duchesse Road, Kingston, Hello World','M','12.06.1991');
INSERT INTO HopitalDB.Patient VALUES ('P005','500-111-1111','M002','Yacoubi','Ahmed','1425 Duchesse Road, Kingston, Hello World','M','04.01.1999');
INSERT INTO HopitalDB.Patient VALUES ('P006','600-111-1111','M002','Sow','Baly','142 Duchesse Road, Kingston, Hello World','M','29.08.2000');
INSERT INTO HopitalDB.Patient VALUES ('P007','700-111-1111','M001','Vaillancourt','Emilie','120 Duchesse Road, Kingston, Hello World','F','31.01.2016');
INSERT INTO HopitalDB.Patient VALUES ('P008','800-111-1111','M003','Decossard','Hyaad','125 Duchesse Road, Kingston, Hello World','M','15.05.2006');
INSERT INTO HopitalDB.Patient VALUES ('P009','900-111-1111','M002','Coulibaly','Amadou','185 Duchesse Road, Kingston, Hello World','M','09.10.1946');

INSERT INTO HopitalDB.Pathologie VALUES ('Rhume');
INSERT INTO HopitalDB.Pathologie VALUES ('Grippe');
INSERT INTO HopitalDB.Pathologie VALUES ('Cancer du foie');
INSERT INTO HopitalDB.Pathologie VALUES ('Cancer');



INSERT INTO HopitalDB.PathologiePatient VALUES ('P006','Rhume','23.03.2007','23.03.2014');
INSERT INTO HopitalDB.PathologiePatient VALUES ('P007','Grippe','31.01.2016','31.11.2016');
INSERT INTO HopitalDB.PathologiePatient VALUES ('P008','Cancer du foie','15.05.2010','15.05.2015');
INSERT INTO HopitalDB.PathologiePatient VALUES ('P009','Cancer','09.10.1996','15.05.2006');


INSERT INTO HopitalDB.Consultation VALUES ('M001','333-111-1111','P001','Diagnostic.','22.12.2013','12:00');
INSERT INTO HopitalDB.Consultation VALUES ('M001','333-111-1111','P001','Suivi','22.01.2014','10:00');

INSERT INTO HopitalDB.SubstanceActive VALUES ('Paracetamol');
INSERT INTO HopitalDB.SubstanceActive VALUES ('Morphine');

INSERT INTO HopitalDB.Medicament VALUES ('M3','Paracetamol',15.99,TRUE);
INSERT INTO HopitalDB.Medicament VALUES ('M4','Morphine',20.99,TRUE);

INSERT INTO HopitalDB.PrescriptionM VALUES ('P1','P001','12:00','22.12.2013','M3',20);
INSERT INTO HopitalDB.PrescriptionM VALUES ('P2','P001','10:00','22.01.2014','M4',10);

INSERT INTO HopitalDB.ContreIndicationSubSub VALUES ('Paracetamol','Morphine');
INSERT INTO HopitalDB.ContreIndicationSubSub VALUES ('Morphine','Paracetamol');