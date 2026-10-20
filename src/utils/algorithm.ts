/**
 * @license
 * Telif Hakkı (c) 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * Yazar & Geliştirici: Enes Öztürk
 *
 * Algoritma:
 * Ekrandan bir string bir de sayı alan (aralarında virgül ile),
 * ilgili string ifade içerisinden verilen indexteki karakteri çıkartıp
 * ekrana yazdıran algoritma motoru.
 *
 * Örnek:
 * Giriş:  Algoritma,3 Algoritma,5 Algoritma,22 Algoritma,0
 * Çıktı:  Algritma Algortma Algoritma lgoritma
 */

export interface CharacterItem {
  char: string;
  index: number;
  isRemoved: boolean;
  charGroup: 'prefix' | 'removed' | 'suffix' | 'normal';
}

export interface ProcessedPair {
  rawToken: string;
  rawString: string;
  rawIndexStr: string;
  index: number;
  isValidFormat: boolean;
  isOutOfBounds: boolean;
  originalLength: number;
  removedChar: string | null;
  prefix: string;
  suffix: string;
  resultString: string;
  characters: CharacterItem[];
  explanation: string;
}

export interface AlgorithmResult {
  inputText: string;
  pairs: ProcessedPair[];
  outputString: string;
  timestamp: Date;
  executionTimeMs: number;
}

/**
 * Tek bir "Metin,indeks" çiftini işler.
 * Örnek: "Algoritma,3" -> "Algritma"
 */
export function processSinglePair(token: string): ProcessedPair {
  const trimmed = token.trim();
  
  // Virgül pozisyonunu bul (son virgülü temel alarak birden çok virgül durumunda esneklik sağlar)
  const lastCommaIndex = trimmed.lastIndexOf(',');
  
  if (lastCommaIndex === -1) {
    // Virgül yoksa geçersiz format kabul et
    return {
      rawToken: trimmed,
      rawString: trimmed,
      rawIndexStr: '',
      index: -1,
      isValidFormat: false,
      isOutOfBounds: true,
      originalLength: trimmed.length,
      removedChar: null,
      prefix: trimmed,
      suffix: '',
      resultString: trimmed,
      characters: trimmed.split('').map((c, i) => ({
        char: c,
        index: i,
        isRemoved: false,
        charGroup: 'normal'
      })),
      explanation: `Hata: '${trimmed}' ifadesinde virgül (,) ayracı bulunamadı.`
    };
  }

  const str = trimmed.substring(0, lastCommaIndex);
  const indexStr = trimmed.substring(lastCommaIndex + 1).trim();
  const index = parseInt(indexStr, 10);

  if (isNaN(index)) {
    return {
      rawToken: trimmed,
      rawString: str,
      rawIndexStr: indexStr,
      index: NaN,
      isValidFormat: false,
      isOutOfBounds: true,
      originalLength: str.length,
      removedChar: null,
      prefix: str,
      suffix: '',
      resultString: str,
      characters: str.split('').map((c, i) => ({
        char: c,
        index: i,
        isRemoved: false,
        charGroup: 'normal'
      })),
      explanation: `Hata: '${indexStr}' geçerli bir tam sayı indeks değil.`
    };
  }

  const len = str.length;
  const isOutOfBounds = index < 0 || index >= len;

  if (isOutOfBounds) {
    // İndeks metin sınırları dışında ise metin değiştirilmeden korunur (Örn: Algoritma,22 -> Algoritma)
    return {
      rawToken: trimmed,
      rawString: str,
      rawIndexStr: indexStr,
      index,
      isValidFormat: true,
      isOutOfBounds: true,
      originalLength: len,
      removedChar: null,
      prefix: str,
      suffix: '',
      resultString: str,
      characters: str.split('').map((c, i) => ({
        char: c,
        index: i,
        isRemoved: false,
        charGroup: 'normal'
      })),
      explanation: `İndeks [${index}] metin uzunluğunun (${len}) dışında olduğundan metin değiştirilmedi.`
    };
  }

  // İndeks geçerli aralıkta: karakteri çıkart
  const prefix = str.substring(0, index);
  const removedChar = str.charAt(index);
  const suffix = str.substring(index + 1);
  const resultString = prefix + suffix;

  const characters: CharacterItem[] = str.split('').map((c, i) => {
    if (i < index) {
      return { char: c, index: i, isRemoved: false, charGroup: 'prefix' };
    } else if (i === index) {
      return { char: c, index: i, isRemoved: true, charGroup: 'removed' };
    } else {
      return { char: c, index: i, isRemoved: false, charGroup: 'suffix' };
    }
  });

  return {
    rawToken: trimmed,
    rawString: str,
    rawIndexStr: indexStr,
    index,
    isValidFormat: true,
    isOutOfBounds: false,
    originalLength: len,
    removedChar,
    prefix,
    suffix,
    resultString,
    characters,
    explanation: `İndeks [${index}] konumundaki '${removedChar}' karakteri başarıyla çıkartıldı: "${prefix}" + "${suffix}" = "${resultString}".`
  };
}

/**
 * Boşluklarla ayrılmış birden fazla girdiyi işler.
 * Örnek: "Algoritma,3 Algoritma,5 Algoritma,22 Algoritma,0"
 * Çıktı: "Algritma Algortma Algoritma lgoritma"
 */
export function executeAlgorithm(input: string): AlgorithmResult {
  const startTime = performance.now();
  const trimmed = input.trim();

  if (!trimmed) {
    return {
      inputText: '',
      pairs: [],
      outputString: '',
      timestamp: new Date(),
      executionTimeMs: 0
    };
  }

  // Boşluklara göre ayır
  const tokens = trimmed.split(/\s+/);
  const pairs = tokens.map((token) => processSinglePair(token));
  const outputString = pairs.map((p) => p.resultString).join(' ');
  const endTime = performance.now();

  return {
    inputText: input,
    pairs,
    outputString,
    timestamp: new Date(),
    executionTimeMs: Math.max(0.01, Number((endTime - startTime).toFixed(3)))
  };
}

/**
 * Örnek konsol kodu şablonları (C#, Python, JavaScript, Java, C++)
 * Her biri Enes Öztürk imzası ve telif hakları ile üretilir.
 */
export const CODE_TEMPLATES = {
  csharp: `/* =========================================================================
 * Yazar & Geliştirici : Enes Öztürk
 * Algoritma            : String İfadeden İndekse Göre Karakter Çıkartma
 * Telif Hakkı          : © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * ========================================================================= */

using System;

namespace EnesOzturk.KarakterCikartmaAlgoritmasi
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.Title = "Karakter Çıkartma Konsol Uygulaması - Enes Öztürk";
            Console.WriteLine("=== Algoritma Konsol Uygulaması (Enes Öztürk) ===");
            Console.WriteLine("Örnek Giriş: Algoritma,3 Algoritma,5 Algoritma,22 Algoritma,0");
            Console.Write("Lütfen ifadenizi giriniz: ");

            string input = Console.ReadLine();
            if (string.IsNullOrWhiteSpace(input))
            {
                Console.WriteLine("Boş giriş yapıldı.");
                return;
            }

            // Boşluklara göre çiftleri ayır
            string[] items = input.Trim().Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            string[] results = new string[items.Length];

            for (int i = 0; i < items.Length; i++)
            {
                results[i] = KarakterCikart(items[i]);
            }

            // Çıktıyı ekrana yazdır
            Console.WriteLine("\\nÇıktı:");
            Console.WriteLine(string.Join(" ", results));
            
            Console.WriteLine("\\n[Telif Hakkı © 2026 Enes Öztürk]");
            Console.ReadKey();
        }

        static string KarakterCikart(string token)
        {
            int commaPos = token.LastIndexOf(',');
            if (commaPos == -1) return token;

            string text = token.Substring(0, commaPos);
            string indexStr = token.Substring(commaPos + 1);

            if (!int.TryParse(indexStr, out int index))
                return text;

            // İndeks metin sınırları dışındaysa orijinal metni koru
            if (index < 0 || index >= text.Length)
                return text;

            // Belirtilen indisteki karakteri kaldır
            return text.Remove(index, 1);
        }
    }
}`,

  python: `# =========================================================================
# Yazar & Geliştirici : Enes Öztürk
# Algoritma            : String İfadeden İndekse Göre Karakter Çıkartma
# Telif Hakkı          : © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
# =========================================================================

import sys

def karakter_cikart(token: str) -> str:
    """
    'Metin,indeks' formatındaki girdiden belirtilen indeksteki karakteri çıkartır.
    Geliştirici: Enes Öztürk
    """
    if ',' not in token:
        return token
    
    parts = token.rsplit(',', 1)
    text = parts[0]
    
    try:
        index = int(parts[1])
    except ValueError:
        return text
        
    # İndeks aralık dışıysa metin aynen döndürülür
    if index < 0 or index >= len(text):
        return text
        
    return text[:index] + text[index + 1:]

def main():
    print("=== Algoritma Konsol Uygulaması (Enes Öztürk) ===")
    user_input = input("Giriş: ").strip()
    
    if not user_input:
        return
        
    tokens = user_input.split()
    results = [karakter_cikart(t) for t in tokens]
    
    print("Çıktı:", " ".join(results))
    print("© 2026 Enes Öztürk. Tüm Hakları Saklıdır.")

if __name__ == "__main__":
    main()`,

  javascript: `/**
 * =========================================================================
 * Yazar & Geliştirici : Enes Öztürk
 * Algoritma            : String İfadeden İndekse Göre Karakter Çıkartma
 * Telif Hakkı          : © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * =========================================================================
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function karakterCikart(token) {
  const commaIdx = token.lastIndexOf(',');
  if (commaIdx === -1) return token;

  const text = token.slice(0, commaIdx);
  const index = parseInt(token.slice(commaIdx + 1), 10);

  if (isNaN(index) || index < 0 || index >= text.length) {
    return text;
  }

  return text.slice(0, index) + text.slice(index + 1);
}

rl.question('Giriş: ', (answer) => {
  const tokens = answer.trim().split(/\\s+/);
  const output = tokens.map(karakterCikart).join(' ');
  console.log('Çıktı:', output);
  console.log('© 2026 Enes Öztürk');
  rl.close();
});`,

  java: `/* =========================================================================
 * Yazar & Geliştirici : Enes Öztürk
 * Algoritma            : String İfadeden İndekse Göre Karakter Çıkartma
 * Telif Hakkı          : © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * ========================================================================= */

import java.util.Scanner;

public class EnesOzturkAlgoritma {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("=== Algoritma Konsol Uygulaması (Enes Öztürk) ===");
        System.out.print("Giriş: ");

        if (!scanner.hasNextLine()) return;
        String line = scanner.nextLine().trim();

        String[] tokens = line.split("\\\\s+");
        StringBuilder output = new StringBuilder();

        for (int i = 0; i < tokens.length; i++) {
            output.append(karakterCikart(tokens[i]));
            if (i < tokens.length - 1) output.append(" ");
        }

        System.out.println("Çıktı: " + output.toString());
        System.out.println("© 2026 Enes Öztürk. Tüm Hakları Saklıdır.");
        scanner.close();
    }

    private static String karakterCikart(String token) {
        int commaIndex = token.lastIndexOf(',');
        if (commaIndex == -1) return token;

        String text = token.substring(0, commaIndex);
        try {
            int index = Integer.parseInt(token.substring(commaIndex + 1).trim());
            if (index < 0 || index >= text.length()) {
                return text;
            }
            return new StringBuilder(text).deleteCharAt(index).toString();
        } catch (NumberFormatException e) {
            return text;
        }
    }
}`,

  cpp: `/* =========================================================================
 * Yazar & Geliştirici : Enes Öztürk
 * Algoritma            : String İfadeden İndekse Göre Karakter Çıkartma
 * Telif Hakkı          : © 2026 Enes Öztürk. Tüm Hakları Saklıdır.
 * ========================================================================= */

#include <iostream>
#include <string>
#include <sstream>
#include <vector>

std::string karakterCikart(const std::string& token) {
    size_t commaPos = token.rfind(',');
    if (commaPos == std::string::npos) return token;

    std::string text = token.substr(0, commaPos);
    std::string indexStr = token.substr(commaPos + 1);

    try {
        int index = std::stoi(indexStr);
        if (index >= 0 && index < static_cast<int>(text.length())) {
            text.erase(index, 1);
        }
    } catch (...) {
        return text;
    }
    return text;
}

int main() {
    std::cout << "=== Algoritma Konsol Uygulamasi (Enes Ozturk) ===" << std::endl;
    std::cout << "Giris: ";

    std::string line;
    if (std::getline(std::cin, line)) {
        std::istringstream iss(line);
        std::string token;
        bool first = true;

        std::cout << "Cikti: ";
        while (iss >> token) {
            if (!first) std::cout << " ";
            std::cout << karakterCikart(token);
            first = false;
        }
        std::cout << std::endl;
        std::cout << "(c) 2026 Enes Ozturk. Tum Haklari Saklidir." << std::endl;
    }
    return 0;
}`
};
