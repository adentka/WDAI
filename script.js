document.addEventListener('DOMContentLoaded', () => {
  // czekam az sie wszystko załaduje i potem odpalam js
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterButtons.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {        //jezeli nie ma przyciskow filtru to nie generuje bledow w konsoli
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');     // nadaje klase active tylko temu na co kliknelam

        const selectedCategory = btn.getAttribute('data-filter');    //odczytuje wartosc tego co klikknelam np morze jeziora

        galleryItems.forEach((item) => {
          const itemCategory = item.getAttribute('data-category');  //dla kazdefo kafelka sprawdza atrybut
          if (selectedCategory === 'all' || itemCategory === selectedCategory) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';  //jezeli wybiore all to sa wszystkie zdjecia jak morze to nie wszystkie
          }
        });
      });
    });
  }

  //  Kalkulator kosztu rejsu 
  const cruiseSelect = document.getElementById('cruiseType');
  const peopleInput = document.getElementById('peopleCount');
  const totalPriceEl = document.getElementById('totalPrice');
  const discountInfoEl = document.getElementById('discountInfo');

  function updateCalculator() {
    if (!cruiseSelect || !peopleInput || !totalPriceEl) return;

    const unitPrice = parseFloat(cruiseSelect.value) || 0;  //zmienia tekst na liczbe
    let people = parseInt(peopleInput.value, 10) || 1;

    if (people < 1) people = 1;
    if (people > 8) people = 8;

    let total = unitPrice * people;

    if (people >= 4) {
      total = Math.round(total * 0.95);
      discountInfoEl.textContent = 'Naliczono 5% rabatu dla załogi (4+ osoby)!';
    } else {
      discountInfoEl.textContent = 'Dla grup od 4 osób przysługuje 5% rabatu załogowego.';
    }

    totalPriceEl.textContent = `${total.toLocaleString('pl-PL')} PLN`; //w srodek tekstu daje liczbe
  }

  if (cruiseSelect && peopleInput) {
    cruiseSelect.addEventListener('change', updateCalculator);
    peopleInput.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // obsługa wysłania formularza 
  const contactForm = document.getElementById('contactForm');
  const feedbackEl = document.getElementById('formFeedback');

  if (contactForm && feedbackEl) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();          //blokuje przeladowywanie sie strony

      const name = document.getElementById('senderName').value.trim();   //pobiera podane imie i nazwisko
      const topicSelect = document.getElementById('topic');   
      const topicText = topicSelect.options[topicSelect.selectedIndex].text;

      feedbackEl.textContent = `Dziękuję, ${name}! Twoje zgłoszenie w temacie „${topicText}” zostało zapisane. Odpowiem najszybciej, jak tylko zejdę z wachty.`;
      feedbackEl.className = 'form-feedback success';
      contactForm.reset();
    });
  }
});