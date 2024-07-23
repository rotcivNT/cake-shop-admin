export function formatDateTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    return date.toLocaleString('vi-VN', options);
}

// Example usage
// const formattedDateTime = formatDateTime('2024-07-16T23:06:19');
// console.log(formattedDateTime); // Output: "16 tháng 7, 2024, 23:06:19"
