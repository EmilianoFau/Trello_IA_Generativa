def processGenerateVariations(text: str):
    options = text.split("- \"")
    options = [option.strip().strip("\"") for option in options if option]
    return options


def processGenerateListsForBoard(text: str):
    pairs = text.strip().split("\n")
    lists = []
    for pair in pairs:
        if pair:
            title_description = pair.strip().split(" - ")
            if len(title_description) == 2:
                title = title_description[0].strip()
                description = title_description[1].strip()
                lists.append({"title": title, "description": description})
    return lists


def processGenerateCardsForList(text: str):
    pairs = text.strip().split("\n")
    lists = []
    for pair in pairs:
        if pair:
            title_description = pair.strip().split(" - ")
            if len(title_description) == 2:
                title = title_description[0].strip()
                description = title_description[1].strip()
                lists.append({"title": title, "description": description})
    return lists