import { useState, useRef } from 'react';
import { Input } from 'antd';

const formatCardNumber = (value: string) => {
  // Убираем все нецифровые символы
  const cleaned = value.replace(/\D/g, '');

  // Форматируем строку: каждые 4 символа добавляем пробел
  const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');

  return formatted;
};

// Алгоритм Луна для валидации номера карты
const validateCardNumber = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\D/g, ''); // Удаление пробелов и нечисловых символов
    let sum = 0;
    let shouldDouble = false;
  
    // Проход по цифрам с конца в начало
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i], 10);
  
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
  
      sum += digit;
      shouldDouble = !shouldDouble;
    }
  
    // Номер карты валиден, если сумма кратна 10
    return sum % 10 === 0;
};

const CardNumberInput: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const inputRef = useRef<HTMLInputElement>(null); // Реф для инпута

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const start = input.selectionStart ?? 0; // Начальная позиция курсора
    const rawValue = input.value; // Текущее значение инпута до форматирования

    // Форматируем номер карты
    const formattedValue = formatCardNumber(rawValue);

    // Устанавливаем новое значение
    setCardNumber(formattedValue);

    // Корректируем позицию курсора после добавления/удаления пробелов
    const newCursorPos = start + (formattedValue.split(' ').length - rawValue.split(' ').length);

    // Устанавливаем курсор в правильное положение
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.selectionStart = inputRef.current.selectionEnd = newCursorPos;
      }
    }, 0);
  };

  // Пример простой валидации (например, если не 16 цифр)
  const handleSubmit = () => {
    const cleaned = cardNumber.replace(/\D/g, '');
    if (validateCardNumber(cleaned)) {
      alert('Номер карты валиден');
    } else {
      alert('Номер карты не валиден');
    }
  };

  return (
    <Input
        ref={inputRef}
        value={cardNumber}
        onChange={handleChange}
        placeholder="Номер карты"
        maxLength={19} // 16 цифр и 3 пробела
        className='resetInputStyles'
    />
  );
};

export default CardNumberInput;
