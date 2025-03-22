'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedDropdown, { DropdownItem } from '@/components/customized/animated-dropdown';

// Currency options with flag icons
const currencies: DropdownItem[] = [
	{ value: 'usd', label: 'USD', icon: <span>$</span> },
	{ value: 'uah', label: 'UAH', icon: <span>$</span> },
	{ value: 'eur', label: 'EUR', icon: <span>$</span> }
];

// Language options with flag icons
const languages: DropdownItem[] = [
	{ value: 'en', label: 'EN', icon: <span>🇬🇧</span> },
	{ value: 'ua', label: 'UA', icon: <span>🇺🇦</span> }
];

export default function Header() {
	const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
	const [selectedCurrency, setSelectedCurrency] = useState<string>('usd');

	// Get the selected items for display
	const selectedCurrencyItem = currencies.find(item => item.value === selectedCurrency);
	const selectedLanguageItem = languages.find(item => item.value === selectedLanguage);

	return (
		<header className="bg-gray-950 py-4">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="text-2xl font-medium text-gray-400"
					>
						main page
					</motion.div>

					<div className="flex items-center">
						<div className="flex gap-2">
							<AnimatedDropdown
								items={currencies}
								value={selectedCurrency}
								onValueChange={setSelectedCurrency}
								className="w-32 bg-gray-800"
							/>
							<AnimatedDropdown
								items={languages}
								value={selectedLanguage}
								onValueChange={setSelectedLanguage}
								className="w-32 bg-gray-800"
							/>
						</div>
						<div className="hidden md:flex gap-4 mr-4">
							<div className="bg-gray-800 rounded-full py-2 px-4 flex items-center">
								<span className="mr-2">🇬🇧</span>
								<span>{selectedLanguageItem?.label || 'EN'}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}