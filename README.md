## https://quiz-js.onrender.com

#Klasy (Classes):
Kod zawiera dwie klasy: Question i Quiz. Klasy są używane do abstrakcji i reprezentacji obiektów związanych z pytaniami oraz całym quizem.

#Funkcje Asynchroniczne (Async Functions):
Funkcja fetchQuestionsFromAPI jest oznaczona słowem kluczowym async i wykorzystuje await do obsługi asynchronicznego pobierania danych z zewnętrznego API.

#Zdarzenia (Events):
Kod zawiera obsługę zdarzeń na przyciskach, takich jak startQuizButton i nextButton, aby reagować na interakcję użytkownika.

#Pobieranie Danych Z Zewnętrznego Źródła (Fetching Data from External Source):
Kod używa funkcji fetch do pobierania pytań z zewnętrznego API (fetchQuestionsFromAPI).

#Manipulacja DOM (Document Object Model):
Wiele elementów interfejsu użytkownika jest manipulowanych przy użyciu JavaScript, takich jak ukrywanie/odkrywanie elementów (style.display), modyfikacja treści (innerHTML), itp.

#Obsługa Formularzy (Form Handling):
Używane są elementy formularza, takie jak select i button, a także obsługa zdarzeń związanych z nimi.

#Tablice (Arrays):
W wielu miejscach kodu wykorzystywane są tablice, na przykład do przechowywania wyborów w pytaniach, wyników quizu, czy danych pobranych z API.

#Local Storage:
Kod korzysta z localStorage do przechowywania wyników quizu między sesjami użytkownika.

#Pętle (Loops):
Pętla forEach jest używana do iteracji po elementach w różnych miejscach kodu, na przykład przy renderowaniu wyborów odpowiedzi.

#Warunki (Conditions):
Warunki są używane do określenia punktów za pytanie w zależności od trudności, do sprawdzania, czy odpowiedź użytkownika jest poprawna, oraz do określania, czy quiz został zakończony.

#Dynamiczne Renderowanie (Dynamic Rendering):
Elementy interfejsu użytkownika są dynamicznie renderowane w zależności od stanu aplikacji, na przykład pytanie i odpowiedzi w trakcie quizu, czy wyniki po zakończeniu.
