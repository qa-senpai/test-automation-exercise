
Якщо ви хочете підтримати мене, і закинути трохи гривень можете зробити це тут 
https://donatello.to/qasenpai

------------------------------------------------------------------------------

# Exercise

1. Navigate to [Douglas](https://www.douglas.de/de)
2. Handle the cookie consent.
3. Click on "Parfum"
4. List the products based on filters. Create data-driven tests:

# TDD data  

| Criteria (Highlights) | Marke | Produktart | Geschenk fur | Fur Wen |
|-----------------------|-------|------------|--------------|---------|
| Sale                  | ?     | ?          | -            | ?       |
| Neu                   | -     | ?          | -            | ?       |
| Limitiert             | ?     | ?          | ?            | ?       |

? Means any value could be plugged in
-Means criteria is not applicable

# Please walk through the code. Feel free to use your own IDE, tool and framework of your choice.
●	Best Practices: What were the best practices that you have incorporated? What code optimizations have you done? 
●	Execution: Please execute on couple of browsers 

------------------------------------------------------------------------------

# Options for the completed task
-- Playwright+TS
https://github.com/hlazkov/unitedcode-taf

-- Kotlin (not finished)
https://github.com/rmarinsky/test_task_DE

-- Playwright+Python
https://github.com/bklyuka/test_task

------------------------------------------------------------------------------
## Installation

- `npm i` to install all

## How to run tests?

- `npm run all-tests` - Running all tests
- `npx playwright test selectFacet.spec.ts` - Running a single test file

## Useful links

- `https://playwright.dev/` - Playwright-test documentation
- `https://trace.playwright.dev/` - Trace viewer

## Used tools

- [microsoft/playwright](https://github.com/microsoft/playwright) - Playwright-test repo
