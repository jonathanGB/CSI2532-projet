/**************************************************************
Insertion de Donnees
**************************************************************/
INSERT INTO HopitalDB.Secretaire VALUES ('222-111-1111','LeBoeuf','Victoria','355 Golden Road, Kingston, Hello World');
INSERT INTO HopitalDB.Secretaire VALUES ('333-111-1111','Dupont','Vanessa','125 Rose-Marie Road, Kingston, Hello World');

INSERT INTO HopitalDB.Medecin VALUES ('M001','001-111-1111','Tremblay','Victor','35 Silver Road, Kingston, Hello World','222-111-1111','Pediatrie');
INSERT INTO HopitalDB.Medecin VALUES ('M002','002-111-1111','Solo','Elliot','15 Silver Road, Kingston, Hello World','222-111-1111','Medecine generale');
INSERT INTO HopitalDB.Medecin VALUES ('M003','003-111-1111','Labasse','Gregoire','255 Silver Road, Kingston, Hello World','333-111-1111','Pneumonologie');
INSERT INTO HopitalDB.Medecin VALUES ('M004','003-111-1111','Bos','Johan','816 Gold Road, Ottawa, Hello World','222-111-1111','Cardiologie');

INSERT INTO HopitalDB.Patient VALUES ('P000','100-111-1111','M003','De la Serre','Elise','1225 Duchesse Road, Kingston, Hello World','F','22/02/1900');
INSERT INTO HopitalDB.Patient VALUES ('P001','200-111-1111','M003','Deschamps','Elena','145 Duchesse Road, Kingston, Hello World','F','02/12/1910');
INSERT INTO HopitalDB.Patient VALUES ('P002','300-111-1111','M001','Terrier','Christophe','1145 Duchesse Road, Kingston, Hello World','M','23/03/1956');
INSERT INTO HopitalDB.Patient VALUES ('P003','400-111-1111','M002','Zakaria','Abdullah','14 Duchesse Road, Kingston, Hello World','M','12/06/1991');
INSERT INTO HopitalDB.Patient VALUES ('P004','500-111-1111','M002','Yacoubi','Ahmed','1425 Duchesse Road, Kingston, Hello World','M','04/01/1999');
INSERT INTO HopitalDB.Patient VALUES ('P005','600-111-1111','M002','Sow','Baly','142 Duchesse Road, Kingston, Hello World','M','29/08/2000');
INSERT INTO HopitalDB.Patient VALUES ('P006','700-111-1111','M001','Vaillancourt','Emilie','120 Duchesse Road, Kingston, Hello World','F','31/01/2016');
INSERT INTO HopitalDB.Patient VALUES ('P007','800-111-1111','M003','Decossard','Hyaad','125 Duchesse Road, Kingston, Hello World','M','15/05/2006');
INSERT INTO HopitalDB.Patient VALUES ('P008','900-111-1111','M002','Coulibaly','Amadou','185 Duchesse Road, Kingston, Hello World','M','09/10/1946');
INSERT INTO HopitalDB.Patient VALUES ('P009','000-111-1111','M004','Valls','Manuel','13 rue du port, Marseille, Hello World','M','13/08/1962');

INSERT INTO HopitalDB.Pathologie VALUES ('Rhume');
INSERT INTO HopitalDB.Pathologie VALUES ('Grippe');
INSERT INTO HopitalDB.Pathologie VALUES ('Pneumonie');
INSERT INTO HopitalDB.Pathologie VALUES ('Cancer');
INSERT INTO HopitalDB.Pathologie VALUES ('Cancer du foie');
INSERT INTO HopitalDB.Pathologie VALUES ('Stand parasite');

INSERT INTO HopitalDB.PathologiePatient VALUES ('P002','Rhume','25/05/2011','30/07/2011');
INSERT INTO HopitalDB.PathologiePatient VALUES ('P005','Rhume','01/05/2011','05/05/2011');
INSERT INTO HopitalDB.PathologiePatient VALUES ('P005','Grippe','24/07/2013','30/07/2014');
INSERT INTO HopitalDB.PathologiePatient VALUES ('P008','Rhume','25/12/2010','01/01/2011');
INSERT INTO HopitalDB.PathologiePatient VALUES ('P008','Pneumonie','12/02/2015','11/03/2015');
INSERT INTO HopitalDB.PathologiePatient VALUES ('P007','Cancer','11/11/2009','20/10/2015');
INSERT INTO HopitalDB.PathologiePatient VALUES ('P006','Cancer du foie','01/01/2016','31/12/2016');
INSERT INTO HopitalDB.PathologiePatient VALUES ('P004','Cancer du foie','17/02/2007','10/04/2014');
INSERT INTO HopitalDB.PathologiePatient VALUES ('P006','Rhume','23/03/2007','23/03/2014');
INSERT INTO HopitalDB.PathologiePatient VALUES ('P007','Grippe','31/01/2016','31/11/2016');
INSERT INTO HopitalDB.PathologiePatient VALUES ('P008','Cancer du foie','15/05/2010','15/05/2015');
INSERT INTO HopitalDB.PathologiePatient VALUES ('P001','Cancer','09/10/1996','15/05/2006');

INSERT INTO HopitalDB.Consultation VALUES ('M001','333-111-1111','P001','Diagnostic','22/12/2013','12:00');
INSERT INTO HopitalDB.Consultation VALUES ('M001','333-111-1111','P001','Suivi','22/01/2014','10:00');

INSERT INTO HopitalDB.SubstanceActive VALUES ('Lolicium');
INSERT INTO HopitalDB.SubstanceActive VALUES ('Grippodestructor');
INSERT INTO HopitalDB.SubstanceActive VALUES ('Ilesttardium');
INSERT INTO HopitalDB.SubstanceActive VALUES ('Bitonium');
INSERT INTO HopitalDB.SubstanceActive VALUES ('Paracetamol');
INSERT INTO HopitalDB.SubstanceActive VALUES ('Morphine');

INSERT INTO HopitalDB.Medicament VALUES ('Aspirine','Lolicium',12.98,false);
INSERT INTO HopitalDB.Medicament VALUES ('Medicame','Bitonium',93.00,true);
INSERT INTO HopitalDB.Medicament VALUES ('Ropropro','Lolicium',00.98,true);
INSERT INTO HopitalDB.Medicament VALUES ('Pasdideesion','Ilesttardium',999.99,false);
INSERT INTO HopitalDB.Medicament VALUES ('M3','Paracetamol',15.99,true);
INSERT INTO HopitalDB.Medicament VALUES ('M4','Morphine',20.99,true);
INSERT INTO HopitalDB.Medicament VALUES ('M003','Grippodestructor',76.13,true);

INSERT INTO HopitalDB.PrescriptionM VALUES ('P1','P001','12:00','22/12/2013','M3',20);
INSERT INTO HopitalDB.PrescriptionM VALUES ('P2','P001','10:00','22/01/2014','M4',10);

INSERT INTO HopitalDB.ContreIndicationSubSub VALUES ('Paracetamol','Grippodestructor');