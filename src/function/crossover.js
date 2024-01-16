export function isCrossover(obj1, obj2) {
    const ret1 = obj1.getBoundingClientRect();
    const ret2 = obj2.getBoundingClientRect();

    return (
        ret1.left < ret2.left + ret2.width &&
        ret1.left + ret1.width > ret2.left &&
        ret1.top < ret2.top + ret2.height  &&
        ret1.top + ret1.height > ret2.top
    );
}
